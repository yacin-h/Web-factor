// features/categories/types/category.types.ts
export type Category = {
    id: number;
    name: string;
    description: string | null;
};

export type CategoryCreate = {
    name: string;
    description?: string;
};

export type PaginatedCategoryList = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Category[];
};