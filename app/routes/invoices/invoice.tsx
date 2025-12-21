import Classic from "@/components/invoices/templates/classic";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Invoice } from "@/types/invoice";

export default function Invoice() {
    const { id } = useParams<{ id: string }>();
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInvoice = async () => {
            if (!id) return;
            setLoading(true);
            setError(null);
            try {
                const result = await apiFetch(`/user/invoices/${id}/`);
                setInvoice(result);
            } catch (err: any) {
                console.error(err);
                setError("Failed to load invoice");
            } finally {
                setLoading(false);
            }
        };
        fetchInvoice();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!invoice) return <div>Invoice not found</div>;

    return <Classic invoice={invoice} />;
}
