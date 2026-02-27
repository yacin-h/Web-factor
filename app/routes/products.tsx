import { useEffect, useState } from "react";

import Header from "@/components/products/header";
import ProductTable from "@/components/products/productTable";

export default function Products() {
    const [reload, setReload] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    // Auto-refresh when product modal closes (visibility change)
    useEffect(() => {
        window.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") {
                setReload((prev) => prev + 1);
            }
        });

        return () => {
            window.removeEventListener("visibilitychange", () => {});
        };
    }, []);

    return (
        <div className="space-y-4 p-4">
            <Header
                setSearchQuery={setSearchQuery}
                onAdded={() => {
                    // Increment reload to trigger table refresh
                    setReload((prev) => prev + 1);
                }}
            />
            <ProductTable
                reload={reload}
                searchQuery={searchQuery}
                onAdded={() => setReload((prev) => prev + 1)}
            />
        </div>
    );
}
