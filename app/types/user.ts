import type { Product } from "./product";

export type User = {
    name: string;
    email: string;
    phone_number: string;
    store_name: string;
    store_description: string;
    store_address: string;
    insta_link: string;
    id: string; // UUID
    products: Product[];
};
