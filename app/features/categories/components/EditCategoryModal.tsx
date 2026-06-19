// features/categories/components/EditCategoryModal.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/features/shared/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/features/shared/components/ui/dialog";
import { Input } from "@/features/shared/components/ui/input";
import { Label } from "@/features/shared/components/ui/label";
import { Textarea } from "@/features/shared/components/ui/textarea";

import { useUpdateCategory } from "../hooks/useUpdateCategory";
import type { Category } from "../types/category.types";

const schema = z.object({
    name: z.string().min(2, "حداقل ۲ کاراکتر"),
    description: z.string().optional(),
});

interface EditCategoryModalProps {
    category: Category;
}

export default function EditCategoryModal({
    category,
}: EditCategoryModalProps) {
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: category.name,
            description: category.description || "",
        },
    });
    const { mutateAsync, isPending } = useUpdateCategory();

    const onSubmit = async (data: any) => {
        await mutateAsync({ id: category.id, data });
        reset();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>ویرایش دسته‌بندی</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label>نام دسته‌بندی</Label>
                        <Input {...register("name")} />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label>توضیحات (اختیاری)</Label>
                        <Textarea {...register("description")} />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => setOpen(false)}
                        >
                            انصراف
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending
                                ? "در حال ویرایش..."
                                : "ویرایش دسته‌بندی"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
