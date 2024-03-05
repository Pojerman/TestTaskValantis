import {ProductItems} from "../../shared/types/products.ts";
import Product from "../../entities/product/product.tsx";
import {uniqueProductItems} from "../../shared/utils/utils.ts";
import "./product-list.css";
import ProductLoading from "../../entities/product-loading/product-loading.tsx";
import {useMemo} from "react";

type ProductListProps = {
    productItems: ProductItems[];
    loading: boolean;
}

export default function ProductList({productItems, loading}:ProductListProps) {
    const uniqueProduct = useMemo(() => uniqueProductItems(productItems), [productItems]);

    if(loading) {
        return (
            <div className="product-list container">
                {Array.from({length: 49}, (_, index) => (
                    <ProductLoading key={index}></ProductLoading>
                ))}
            </div>
        )
    }

    return (
        <div className="product-list container">
            {uniqueProduct.map((product) => (
                <Product key={product.id} product={product}></Product>
            ))}
        </div>
    )
}