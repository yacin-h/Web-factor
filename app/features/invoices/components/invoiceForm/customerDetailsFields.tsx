import { useFormContext } from "react-hook-form";

import { Input } from "@/features/shared/components/ui/input";
import { Label } from "@/features/shared/components/ui/label";

import type { InvoiceFormType } from "../../schema/invoice.schema";
export default function CustomerDetailsFields() {
    const {register, formState:{errors}} = useFormContext<InvoiceFormType>();
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
                <Label htmlFor="customer_name">نام مشتری</Label>
                <Input {...register("customer_name")} id="customer_name" />
                {errors.customer_name && (
                    <span className="text-red-500">
                        {errors.customer_name.message}
                    </span>
                )}
            </div>
            <div className="space-y-3">
                <Label htmlFor="customer_phone_number">شماره تلفن</Label>
                <Input
                    {...register("customer_phone_number")}
                    id="customer_phone_number"
                />
                {errors.customer_phone_number && (
                    <span className="text-red-500">
                        {errors.customer_phone_number.message}
                    </span>
                )}
            </div>
            <div className="space-y-3">
                <Label htmlFor="customer_email">ایمیل</Label>
                <Input
                    {...register("customer_email")}
                    id="customer_email"
                    type="email"
                />
                {errors.customer_email && (
                    <span className="text-red-500">
                        {errors.customer_email.message}
                    </span>
                )}
            </div>
            <div className="space-y-3">
                <Label htmlFor="customer_address">آدرس</Label>
                <Input
                    {...register("customer_address")}
                    id="customer_address"
                />
                {errors.customer_address && (
                    <span className="text-red-500">
                        {errors.customer_address.message}
                    </span>
                )}
            </div>
        </div>
    );
}
