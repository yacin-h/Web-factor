import { Form, Link, redirect, useFetcher, useNavigate } from "react-router";
import type { Route } from "./+types/invoice";
export async function clientLoader({ params }: Route.LoaderArgs) {
    const invoiceId = params.invoiceId;
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${invoiceId}`
    );
    return await res.json();
}

export async function clientAction({ params }: Route.ClientActionArgs) {
    try {
        await fetch(
            `https://jsonplaceholder.typicode.com/posts/${params.invoiceId}`,
            {
                method: "DELETE",
            }
        );
        return { isDeleted: true };
    } catch (error) {
        return { isDeleted: false };
    }
}

export default function Invoice({ loaderData }: Route.ComponentProps) {
    const fetcher = useFetcher();
    const isDeleted = fetcher.data?.isDeleted;
    const navigate = useNavigate();
    return (
        <>
            {!isDeleted && (
                <>
                    <h1>title: {loaderData.title}</h1>
                    <p>body: {loaderData.body}</p>
                    <button onClick={() => navigate("/")}>home</button>
                    <Link to={"/about"}>about</Link>
                    <fetcher.Form method="delete">
                        <button type="submit">Delete</button>
                    </fetcher.Form>
                </>
            )}
        </>
    );
}
