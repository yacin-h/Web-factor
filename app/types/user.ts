import type { Product } from "./product";

export type User = {
    first_name: string;
    last_name: string;
    phone_number: string;
    store_name: string;
    store_description: string;
    store_address: string;
    insta_link: string;
    date_joined:string;
};
export type UserCreate = {
    first_name: string;
    last_name: string;
    store_name: string;
    store_description: string;
    store_address: string;
    insta_link: string;
};