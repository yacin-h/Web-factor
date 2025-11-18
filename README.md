# Router 
## define routes in routes.ts
```js
route("about","routes/About.tsx"),
```

each route needs a loader to ignore it use default export 

## use params in components.
```js
// in routes.ts
route("invoice/:invoiceId","routes/invoice.tsx")
```

```js
// Define the loader function that runs before rendering the route
// Route.LoaderArgs gives us the correct types for params, request, etc.
export async function loader({ params }: Route.LoaderArgs){
    
    // Get the invoiceId from the URL parameters (e.g. /invoice/123)
    const invoiceId=params.invoiceId

     // The returned object becomes "loaderData" in the component
    return {invoiceId}
}

export default function Invoice({loaderData}:Route.ComponentProps){
    return <h1>Invoice {loaderData.invoiceId}</h1>
}
```
