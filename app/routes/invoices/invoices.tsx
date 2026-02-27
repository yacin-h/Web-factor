import { useEffect, useRef, useState } from "react";

import Header from "@/components/invoices/header";
import InvoiceTable from "@/components/invoices/invoiceTable";
import { useCacheStore } from "@/store/cacheStore";

export default function invoices() {
    const [reload, setReload] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [status, setStatus] = useState("all");

    // Auto-refresh when coming back from creating/editing invoice in another tab
    // Only refresh if a write occurred since we last checked (avoids refreshing on every alt-tab)
    const lastSeenWriteRef = useRef<number>(0);

    useEffect(() => {
        // initialize lastSeenWriteRef from storage
        try {
            const v = localStorage.getItem("lastWriteAt");
            lastSeenWriteRef.current = v ? Number(v) : 0;
        } catch (e) {
            lastSeenWriteRef.current = 0;
        }

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                try {
                    const lastWrite = Number(
                        localStorage.getItem("lastWriteAt") || 0,
                    );
                    if (lastWrite > (lastSeenWriteRef.current || 0)) {
                        // Invalidate invoices caches so next fetch gets fresh data
                        useCacheStore
                            .getState()
                            .invalidateCacheByPrefix("/user/invoices/");
                        // Refresh list when tab becomes visible and a write occurred
                        setReload((prev) => prev + 1);
                        lastSeenWriteRef.current = lastWrite;
                    }
                } catch (e) {
                    // If storage fails, fall back to refreshing once
                    useCacheStore
                        .getState()
                        .invalidateCacheByPrefix("/user/invoices/");
                    setReload((prev) => prev + 1);
                }
            }
        };

        window.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            window.removeEventListener(
                "visibilitychange",
                handleVisibilityChange,
            );
        };
    }, []);

    return (
        <>
            <Header setSearchQuery={setSearchQuery} setStatus={setStatus} />
            <InvoiceTable
                reload={reload}
                searchQuery={searchQuery}
                status={status}
            />
        </>
    );
}
