import {ProductItems} from "../../entities/types/products.ts";
import Product from "../../entities/product/product.tsx";
import {uniqueProductItems} from "../../shared/utils/utils.ts";
import "./product-list.css";
import ProductLoading from "../../entities/product-loading/product-loading.tsx";

type ProductListProps = {
    productItems: ProductItems[] | null;
    loading: boolean;
}

export default function ProductList({productItems, loading}:ProductListProps) {
    if(loading || productItems === null) {
        return (
            <div className="product-list container">
                {Array.from({length: 49}, (_, index) => (
                    <ProductLoading key={index}></ProductLoading>
                ))}
            </div>
        )
    }


    const uniqueProduct = uniqueProductItems(productItems);

    return (
        <div className="product-list container">
            {uniqueProduct.map((product) => (
                <Product key={product.id} product={product}></Product>
            ))}
        </div>
    )
}