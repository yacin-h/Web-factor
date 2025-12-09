import type { SignupFormType } from "@/schemas/auth.schema";
import type { Token } from "@/types/token";

export async function signupUser(data: SignupFormType) {
    const res = await fetch("https://tesrepo-final.onrender.com/api/v1/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw error;
    }

    return res.json();
}

export async function loginUser(data: Token) {
    const res = await fetch("https://tesrepo-final.onrender.com/api/v1/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw error;
    }

    return res.json();
}

export async function requestOtp(phone: { phone_number: string }) {
    const res = await fetch(
        "https://invociemanager-production.up.railway.app/account/request_otp/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(phone),
        }
    );

    if (!res.ok) {
        const error = await res.json();
        throw error;
    }

    return res.json();
}

export async function verifyOtp(payload: { phone_number: string; otp_code: string }) {
    const res = await fetch(
        "https://invociemanager-production.up.railway.app/account/register/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );

    if (!res.ok) {
        const error = await res.json();
        throw error;
    }

    return res.json();
}