import {uniqueProductBrand} from "../../shared/utils/utils.ts";
import "./product-filter.css";

type ProductFilter = {
    productBrands: string[];
}

export default function ProductFilter({productBrands}:ProductFilter) {
    const uniqueBrands = uniqueProductBrand(productBrands);
    return(
        <div className="filter container">
            <input className="filter-product" type="text" placeholder="Название"/>
            <select className="filter-brand">
                <option value="">Бренд</option>
                {uniqueBrands.map((brand, index) => (
                    <option key={index} value={brand}>
                        {brand}
                    </option>
                ))}
            </select>
            <input className="filter-price" type="text" placeholder="Цена"/>
            <button className="product-button filter-button"><span>Поиск</span></button>
        </div>
    )
}