import type { Invoice } from "@/features/invoices/types/invoicePreview.type";

export type CustomerInvoiceList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Invoice[];
};