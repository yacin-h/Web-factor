import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import Classic from "@/components/invoices/templates/classic";
import Minimal from "@/components/invoices/templates/minimal";
import Modern from "@/components/invoices/templates/modern";
import { useTheme } from "@/components/themeProvider";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Zoomable from "@/components/zoomable";
import { apiFetch } from "@/lib/api";
import { buildInvoiceViewModel } from "@/lib/invoiceViewModel";
import type { Invoice, PublicInvoice } from "@/types/invoice";
import type { User } from "@/types/user";

export default function PublicInvoice() {
    const { invoiceToken } = useParams<{ invoiceToken: string }>();
    const { theme, setTheme } = useTheme();
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [template, setTemplate] = useState("minimal");

    useEffect(() => {
        const fetchInvoice = async () => {
            if (!invoiceToken) {
                setError("توکن فاکتور نامعتبر است");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const response = await apiFetch<PublicInvoice>(
                    `/api/public/invoices/${invoiceToken}/`,
                );

                console.log("API Response:", response);

                // Extract invoice from nested structure
                const invoiceData = response.invoice;

                console.log("Invoice Data:", invoiceData);

                if (!invoiceData || !invoiceData.id) {
                    console.error("Invoice data is invalid:", invoiceData);
                    setError("فاکتور یافت نشد یا دادهٔ نامعتبر است");
                    return;
                }

                // Map PublicInvoice data to Invoice format for templates
                setInvoice(invoiceData as any);

                // Build user/creator object from seller info at top level
                const sellerInfo: User = {
                    id: response.id,
                    phone_number: response.phone_number || "",
                    first_name: response.creator?.split(" ")[0] || "",
                    last_name: response.creator?.split(" ")[1] || "",
                    date_joined: response.created_at,
                    profile: {
                        store_name: response.creator || "فروشگاه",
                        store_description: response.store_description || "",
                        store_address: response.store_address || "",
                        insta_link: response.insta_link || "",
                        hexcolor: response.hexcolor || "#000000",
                        logo: response.logo || "",
                    },
                };

                console.log("Seller Info:", sellerInfo);
                setUser(sellerInfo);
            } catch (err: any) {
                console.error("Error fetching invoice:", err);
                setError(err?.message || "خطا در بارگذاری فاکتور");
            } finally {
                setLoading(false);
            }
        };
        fetchInvoice();
    }, [invoiceToken]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>در حال بارگذاری...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen flex-col gap-4">
                <div className="text-red-500 text-center">
                    <p className="font-semibold">{error}</p>
                    <p className="text-sm text-gray-600 mt-2">
                        توکن: {invoiceToken}
                    </p>
                </div>
                <details className="bg-gray-100 p-4 rounded text-sm max-w-md">
                    <summary className="cursor-pointer font-semibold">
                        جزئیات خطا (مشاهدهٔ کنسول مرورگر)
                    </summary>
                    <p className="mt-2 text-gray-700">
                        لطفاً کنسول مرورگر (F12) را باز کنید و خطاهای قرمز را
                        بررسی کنید
                    </p>
                </details>
            </div>
        );
    }

    if (!invoice) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>فاکتور یافت نشد</div>
            </div>
        );
    }

    const viewModel = buildInvoiceViewModel({ invoice });

    return (
        <>
            <div className="mb-4 flex gap-4 print:hidden">
                <Select value={template} onValueChange={setTemplate}>
                    <SelectTrigger className="w-fit bg-white">
                        <SelectValue placeholder="قالب" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="classic">کلاسیک</SelectItem>
                        <SelectItem value="minimal">مینیمال</SelectItem>
                        <SelectItem value="modern">مدرن</SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={() => window.print()}>چاپ</Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                    }
                    title={theme === "dark" ? "حالت روشن" : "حالت تاریک"}
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                </Button>
            </div>
            <div
                className="
                                    relative
                                    w-full min-h-screen
                                    overflow-hidden
                                    bg-muted p-5
                                    flex justify-center items-start
                                    dark:bg-muted-foreground
                                    print:text-black print:bg-white print:p-0 print:m-0 print:overflow-visible
                                "
            >
                <Zoomable>
                    {template === "classic" ? (
                        <Classic invoice={viewModel} user={user} />
                    ) : template === "modern" ? (
                        <Modern invoice={viewModel} user={user} />
                    ) : (
                        <Minimal invoice={viewModel} user={user} />
                    )}
                </Zoomable>
            </div>
        </>
    );
}
