import { Controller, useFormContext } from "react-hook-form";

import type { Product } from "@/features/products/types/product";
import { Label } from "@/features/shared/components/ui/label";
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
} from "@/features/shared/components/ui/multi-select";

import type { InvoiceFormType } from "../../schema/invoice.schema";

type ProductMultiSelectProps = {
    products: Product[];
};
export default function ProductMultiSelect({
    products,
}: ProductMultiSelectProps) {
    const { control } = useFormContext<InvoiceFormType>();
    return (
        <Controller
            control={control}
            name="items"
            render={({ field, fieldState: { error } }) => (
                <div className="flex flex-col gap-2">
                    <Label>انتخاب با نام کالا</Label>
                    <MultiSelect
                        values={field.value.map((item) =>
                            String(item.product_id),
                        )}
                        onValuesChange={(vals) => {
                            const newItems = vals.map((val) => {
                                const existing = field.value.find(
                                    (i) => i.product_id === Number(val),
                                );
                                if (existing) return existing;
                                const product = products.find(
                                    (p) => p.id === Number(val),
                                );
                                return {
                                    product_id: Number(val),
                                    quantity: 1,
                                    price: product?.price ?? 0,
                                };
                            });
                            field.onChange(newItems);
                        }}
                    >
                        <MultiSelectTrigger className="w-full hover:bg-primary-foreground bg-primary-foreground">
                            <MultiSelectValue
                                placeholder="کالا رو جستجو کن"
                                overflowBehavior="wrap"
                            />
                        </MultiSelectTrigger>

                        <MultiSelectContent search>
                            <MultiSelectGroup>
                                {products.map((product) => (
                                    <MultiSelectItem
                                        key={product.id}
                                        value={String(product.id)}
                                    >
                                        {product.name}
                                    </MultiSelectItem>
                                ))}
                            </MultiSelectGroup>
                        </MultiSelectContent>
                    </MultiSelect>
                    {error && (
                        <span className="text-red-500">
                            {error.message || "حداقل یک آیتم الزامی است"}
                        </span>
                    )}
                </div>
            )}
        />
    );
}
