import type {Route} from "./+types/invoice"
export async function loader({ params }: Route.LoaderArgs){
    const invoiceId=params.invoiceId
    return {invoiceId}
}
export default function Invoice({loaderData}:Route.ComponentProps){
    return <h1>Invoice {loaderData.invoiceId}</h1>
}