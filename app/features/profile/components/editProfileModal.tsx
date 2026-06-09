import { useEffect, useState } from "react";
import { toast } from "sonner";

import type { User } from "@/features/auth/types/user.type";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/features/shared/components/ui/dialog";

import { Button } from "../../shared/components/ui/button";
import { Input } from "../../shared/components/ui/input";
import { Label } from "../../shared/components/ui/label";
import { Textarea } from "../../shared/components/ui/textarea";
import { useEditProfile } from "../hooks/useEditProfile";

export default function EditProfileModal({
    profile,
}: {
    profile: User;
}) {
    const [open, setOpen] = useState(false);
    const [logoFile, setLogoFile] = useState<File | null>(null);

    const { form, mutateAsync, isPending } = useEditProfile(profile, () => {
        setOpen(false);
    });

    const { register, handleSubmit, reset, formState: { errors } } = form;

    useEffect(() => {
        reset({
            first_name: profile.first_name,
            last_name: profile.last_name,
            store_name: profile.profile.store_name,
            store_description: profile.profile.store_description,
            store_address: profile.profile.store_address,
            insta_link: profile.profile.insta_link,
            hexcolor: profile.profile.hexcolor,
        });
        setLogoFile(null);
    }, [profile, reset]);

    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <Button>ویرایش پروفایل</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>ویرایش پروفایل</DialogTitle>
                    <DialogDescription>
                        <span>ویرایش اطلاعات پروفایل</span>
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit((data) => mutateAsync({ data, logoFile }))}
                    className="space-y-5 grid grid-cols-2 gap-x-4"
                >
                    <div className="space-y-2">
                        <Label htmlFor="first_name">نام</Label>
                        <Input
                            type="text"
                            id="first_name"
                            placeholder="نام"
                            {...register("first_name", {
                                minLength: { value: 2, message: "حداقل ۲ کاراکتر" },
                                maxLength: { value: 30, message: "حداکثر ۳۰ کاراکتر" },
                            })}
                        />
                        <p className="text-red-500 text-sm">{errors.first_name?.message}</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="last_name">نام خانوادگی</Label>
                        <Input
                            type="text"
                            id="last_name"
                            placeholder="نام خانوادگی"
                            {...register("last_name", {
                                minLength: { value: 2, message: "حداقل ۲ کاراکتر" },
                                maxLength: { value: 30, message: "حداکثر ۳۰ کاراکتر" },
                            })}
                        />
                        <p className="text-red-500 text-sm">{errors.last_name?.message}</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="store_name">نام فروشگاه</Label>
                        <Input
                            type="text"
                            id="store_name"
                            placeholder="نام فروشگاه"
                            {...register("store_name", {
                                maxLength: { value: 50, message: "حداکثر ۵۰ کاراکتر" },
                            })}
                        />
                        <p className="text-red-500 text-sm">{errors?.store_name?.message}</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="store_description">توضیحات فروشگاه</Label>
                        <Textarea
                            id="store_description"
                            placeholder="توضیحات فروشگاه"
                            {...register("store_description")}
                        />
                        <p className="text-red-500 text-sm">{errors?.store_description?.message}</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="store_address">آدرس فروشگاه</Label>
                        <Input
                            type="text"
                            id="store_address"
                            placeholder="آدرس فروشگاه"
                            {...register("store_address", {
                                maxLength: { value: 255, message: "حداکثر ۲۵۵ کاراکتر" },
                            })}
                        />
                        <p className="text-red-500 text-sm">{errors?.store_address?.message}</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="insta_link">لینک اینستاگرام</Label>
                        <Input
                            type="text"
                            id="insta_link"
                            placeholder="لینک اینستاگرام"
                            {...register("insta_link", {
                                maxLength: { value: 100, message: "حداکثر ۱۰۰ کاراکتر" },
                            })}
                        />
                        <p className="text-red-500 text-sm">{errors?.insta_link?.message}</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="hexcolor">رنگ برند</Label>
                        <Input type="color" id="hexcolor" {...register("hexcolor")} />
                        <p className="text-red-500 text-sm">{errors?.hexcolor?.message}</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="logo">  لوگو (حداکثر 250 کیلوبایت)</Label>
                        <Input
                            type="file"
                            id="logo"
                            accept="image/png"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;

                                if (file.type !== "image/png") {
                                    toast.error("فقط فایل‌های PNG قابل قبول هستند");
                                    e.target.value = "";
                                    setLogoFile(null);
                                    return;
                                }

                                setLogoFile(file);
                                toast.success("لوگو با موفقیت انتخاب شد");
                            }}
                        />
                        <p className="text-red-500 text-sm">{errors?.logo?.message}</p>
                    </div>

                    {errors.root && (
                        <p className="text-red-500 text-sm col-span-2 text-center">
                            {errors.root.message}
                        </p>
                    )}

                    <Button type="submit" disabled={isPending} className="w-full col-span-2">
                        {isPending ? "در حال ارسال..." : "ویرایش پروفایل"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}