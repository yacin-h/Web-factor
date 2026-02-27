import { useEffect, useState } from "react";

import CustomersTable from "@/components/customers/customersTable";
import Header from "@/components/customers/header";

export default function Customers() {
    const [reload, setReload] = useState(0);

    // Auto-refresh when customer modal closes (visibility change)
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
        <>
            <Header
                onAdded={() => {
                    // Increment reload to trigger table refresh
                    setReload((prev) => prev + 1);
                }}
            />
            <CustomersTable reload={reload} />
        </>
    );
}
