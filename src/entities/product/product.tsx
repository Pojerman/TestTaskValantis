import {ProductItems} from "../types/products.ts";
import "./product.css";
import ProductImg from "../../assets/product.jpg";
import ProductButton from "../../features/product-button/product-button.tsx";

type ProductProps = {
    product: ProductItems;
}

export default function Product({product}:ProductProps) {
    return(
        <article className="product">
            <div className="product-img">
                <img src={ProductImg} alt={product.product} width={255} height={200}/>
            </div>
            <div className="product-info">
                <h1 className="product-info-title">{product.product}</h1>
                <p className="product-info-id">{product.id}</p>
                <p className="product-info-brand">Бренд:&nbsp;
                    {
                        product.brand ? <span>{product.brand}</span> : <span>-</span>
                    }
                </p>
                <p className="product-info-price">Цена:&nbsp;{product.price}</p>
                <ProductButton/>
            </div>
        </article>
    )
}