// features/invoices/components/InvoiceForm/vatAndDiscountSection.tsx
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@/features/shared/components/ui/input";
import { Label } from "@/features/shared/components/ui/label";
import { Switch } from "@/features/shared/components/ui/switch";

import type { InvoiceFormType } from "../../schema/invoice.schema";

interface VatAndDiscountSectionProps {
    vatEnabled: boolean;
    onVatToggle: (enabled: boolean) => void;
    addedValue: number;
}

export default function VatAndDiscountSection({
    vatEnabled,
    onVatToggle,
    addedValue,
}: VatAndDiscountSectionProps) {
    const { control } = useFormContext<InvoiceFormType>();

    return (
        <div className="grid grid-cols-2 gap-4">
            {/* ارزش افزوده */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Switch
                        checked={vatEnabled}
                        onCheckedChange={onVatToggle}
                    />
                    <Label>ارزش افزوده (۱۰٪)</Label>
                </div>
                {vatEnabled && (
                    <span className="text-sm text-muted-foreground">
                        مبلغ ارزش افزوده:{" "}
                        <strong>{addedValue?.toLocaleString() ?? 0}</strong>{" "}
                        تومان
                    </span>
                )}
            </div>

            {/* تخفیف */}
            <div className="flex flex-col">
                <Label htmlFor="discount">تخفیف</Label>
                <Controller
                    control={control}
                    name="discount"
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="number"
                            min={0}
                            step={1}
                            onChange={(e) =>
                                field.onChange(e.target.valueAsNumber)
                            }
                        />
                    )}
                />
            </div>
        </div>
    );
}
