// routes/categories.tsx
import {  FolderTree,  Search, Trash, X } from "lucide-react";
import { useState } from "react";

import AddCategoryModal from "@/features/categories/components/AddCategoryModal";
import EditCategoryModal from "@/features/categories/components/EditCategoryModal";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useDeleteCategory } from "@/features/categories/hooks/useDeleteCategory";
import { Badge } from "@/features/shared/components/ui/badge";
import { Button } from "@/features/shared/components/ui/button";
import { Card } from "@/features/shared/components/ui/card";
import DeleteConfirm from "@/features/shared/components/ui/deleteConfirm";
import { Input } from "@/features/shared/components/ui/input";
import LoadingSpinner from "@/features/shared/components/ui/loadingSpinner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/features/shared/components/ui/table";

export default function CategoriesPage() {
    const [search, setSearch] = useState("");
    const [page] = useState(1);
    const { data, isLoading } = useCategories({ page, search });
    const { mutateAsync: deleteCategory } = useDeleteCategory();

    if (isLoading) return <LoadingSpinner />;

    const handleDelete = async (id: number) => {
        await deleteCategory(id);
    };

    return (
        <div className="space-y-6">
            {/* هدر صفحه */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">مدیریت دسته‌بندی‌ها</h1>
                    <p className="text-muted-foreground text-sm">
                        مدیریت دسته‌بندی محصولات برای سازماندهی بهتر
                    </p>
                </div>
                <AddCategoryModal />
            </div>

            {/* جستجو و فیلتر */}
            <Card className="p-4">
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="جستجوی دسته‌بندی..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pr-9"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute left-3 top-1/2 -translate-y-1/2"
                            >
                                <span className="sr-only">close</span>
                                <X className="h-4 w-4 text-muted-foreground" />
                            </button>
                        )}
                    </div>
                    <Badge variant="outline" className="whitespace-nowrap">
                        {data?.count || 0} دسته‌بندی
                    </Badge>
                </div>
            </Card>

            {/* جدول دسته‌بندی‌ها */}
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-16">#</TableHead>
                            <TableHead>نام دسته‌بندی</TableHead>
                            <TableHead>توضیحات</TableHead>
                            <TableHead className="text-left">عملیات</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.results?.map((category, index) => (
                            <TableRow key={category.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        <FolderTree className="h-4 w-4 text-muted-foreground" />
                                        {category.name}
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {category.description || "-"}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <EditCategoryModal
                                            category={category}
                                        />
                                        <DeleteConfirm
                                            title="دسته‌بندی"
                                            onConfirm={() =>
                                                handleDelete(category.id)
                                            }
                                            trigger={
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            }
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
