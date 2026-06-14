// features/dashboard/components/pendingInvoicesTable.tsx
import type { PaginatedInvoiceList } from "@/features/invoices/types/invoicePreview.type";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/features/shared/components/ui/table";

import { InvoiceTableRows } from "./invoiceTableRows";

export default function PendingInvoicesTable({
    pendingData,
}: {
    pendingData?: PaginatedInvoiceList;
}) {
    return (
        <section className="rounded-xl border bg-card p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-3">
                فاکتورهای در انتظار پرداخت
            </h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>شماره فاکتور</TableHead>
                        <TableHead>نام مشتری</TableHead>
                        <TableHead>شماره تلفن</TableHead>
                        <TableHead>وضعیت</TableHead>
                        <TableHead>مبلغ کل</TableHead>
                        <TableHead>تاریخ</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <InvoiceTableRows
                        invoices={pendingData?.results || []}
                        emptyMessage="هیچ فاکتور در انتظار پرداختی وجود ندارد."
                        emptyAction={{
                            text: "ایجاد فاکتور جدید",
                            link: "/invoices/new",
                        }}
                    />
                </TableBody>
            </Table>
        </section>
    );
}
