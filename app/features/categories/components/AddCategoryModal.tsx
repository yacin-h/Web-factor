// features/categories/components/AddCategoryModal.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus} from "lucide-react";
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

import { useCreateCategory } from "../hooks/useCreateCategory";

const schema = z.object({
    name: z.string().min(2, "حداقل ۲ کاراکتر"),
    description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface AddCategoryModalProps {
    trigger?: React.ReactNode;
}

export default function AddCategoryModal({ trigger }: AddCategoryModalProps) {
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });
    const { mutateAsync, isPending } = useCreateCategory();

    const onSubmit = async (data: FormData) => {
        await mutateAsync(data);
        reset();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 ml-1" />
                        دسته‌بندی جدید
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>ایجاد دسته‌بندی جدید</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label>نام دسته‌بندی</Label>
                        <Input
                            placeholder="مثال: الکترونیک"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label>توضیحات (اختیاری)</Label>
                        <Textarea
                            placeholder="توضیحات دسته‌بندی..."
                            {...register("description")}
                        />
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
                            {isPending ? "در حال ایجاد..." : "ایجاد دسته‌بندی"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
