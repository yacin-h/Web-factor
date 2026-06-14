// InvoiceTableRows.tsx
import clsx from "clsx";
import { Link } from "react-router";

import { invoiceStatusFa } from "@/features/invoices/constants/invoice";
import type { Invoice } from "@/features/invoices/types/invoicePreview.type";
import { Badge } from "@/features/shared/components/ui/badge";
import { Button } from "@/features/shared/components/ui/button";
import { TableCell, TableRow } from "@/features/shared/components/ui/table";

interface InvoiceTableRowsProps {
    invoices: Invoice[];
    emptyMessage: string;
    emptyAction?: {
        text: string;
        link: string;
    };
}

export function InvoiceTableRows({
    invoices,
    emptyMessage,
    emptyAction,
}: InvoiceTableRowsProps) {
    if (!invoices.length) {
        return (
            <TableRow>
                <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground py-8"
                >
                    <div className="flex flex-col items-center gap-3">
                        <p>{emptyMessage}</p>
                        {emptyAction && (
                            <Link to={emptyAction.link}>
                                <Button variant="outline" size="sm">
                                    {emptyAction.text}
                                </Button>
                            </Link>
                        )}
                    </div>
                </TableCell>
            </TableRow>
        );
    }

    return invoices.map((invoice) => (
        <TableRow key={invoice.id}>
            <TableCell>{invoice.invoice_number || "-"}</TableCell>
            <TableCell>{invoice.customer_name || "-"}</TableCell>
            <TableCell>{invoice.customer_phone_number || "-"}</TableCell>
            <TableCell>
                {invoice.status ? (
                    <Badge
                        className={clsx("bg-slate-600", {
                            "bg-green-100 text-green-900":
                                invoice.status === "paid",
                            "bg-yellow-100 text-yellow-900":
                                invoice.status === "pending",
                        })}
                    >
                        {invoiceStatusFa[invoice.status]}
                    </Badge>
                ) : (
                    "-"
                )}
            </TableCell>
            <TableCell className="text-right whitespace-nowrap">
                {invoice.total_amount.toLocaleString()} تومان
            </TableCell>
            <TableCell className="whitespace-nowrap">
                {invoice.created.split(" ")[0]}
            </TableCell>
        </TableRow>
    ));
}
