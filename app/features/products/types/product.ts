// features/products/types/product.types.ts

// نوع کامل Product (از سرور میاد)
export type Product = {
    id: number;
    name: string;
    description: string;
    last_buy_price: number;
    price: number;
    barcode: string;
    stock_quantity: number;
    category: {
        id: number;
        name: string;
        description: string;
    } | null;
};

export type ProductCreate = {
    name: string;
    description?: string;
    last_buy_price: number;
    price: number;
    barcode?: string;
    stock_quantity: number;
    category_id?: number | null;
};

export type ProductUpdate = {
    name?: string;
    description?: string | null;
    last_buy_price?: number;
    price?: number;
    barcode?: string | null;
    stock_quantity?: number;
    category_id?: number | null;
};
// Paginated response
export type PaginatedProductList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Product[];
};
