import ProductHeader from "@/components/products/productsHeader";
import ProductTable from "@/components/products/productTable";
import { useState } from "react";

export default function Products() {
    const [reload, setReload] = useState(0);

    return (
        <div className="space-y-4 p-4">
            <ProductHeader onAdded={() => setReload((prev) => prev + 1)} />
            <ProductTable reload={reload} />
        </div>
    );
}
