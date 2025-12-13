const API_BASE_URL = "https://invociemanager-production.up.railway.app";

async function refreshToken() {
    const saved = localStorage.getItem("token");
    if (!saved) return null;

    const { refresh } = JSON.parse(saved);
    const res = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
    });

    if (!res.ok) return null;

    const newToken = await res.json();
    const updated = { ...JSON.parse(saved), access: newToken.access };
    localStorage.setItem("token", JSON.stringify(updated));
    return updated.access;
}

export async function apiFetch(url: string, options: RequestInit = {}) {
    const saved = localStorage.getItem("token");
    const token = saved ? JSON.parse(saved) : null;

    let headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    if (token?.access) headers["Authorization"] = `Bearer ${token.access}`;

    let res = await fetch(`${API_BASE_URL}${url}`, { ...options, headers });

    // Refresh token if 401
    if (res.status === 401) {
        const newAccess = await refreshToken();
        if (!newAccess) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
        }
        headers["Authorization"] = `Bearer ${newAccess}`;
        res = await fetch(`${API_BASE_URL}${url}`, { ...options, headers });
    }

    // فقط اگر body داشته باشه JSON بگیر
    const text = await res.text();
    let data: any = null;
    if (text) {
        try {
            data = JSON.parse(text);
        } catch {
            data = text; // اگر JSON نبود، متن خام رو برگردون
        }
    }

    if (!res.ok) {
        console.error("API Error:", data);
        throw data;
    }

    return data;
}
