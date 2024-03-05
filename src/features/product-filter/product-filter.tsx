import {uniqueProductBrand} from "../../shared/utils/utils.ts";
import "./product-filter.css";
import React, {useEffect, useState} from "react";
import {getFilterProducts, getIds} from "../../shared/api/api.ts";
import {ProductIds} from "../../shared/types/products.ts";

type ProductFilter = {
    productBrands: string[];
    updateProductIds: (items: ProductIds[]) => void;
}

export default function ProductFilter({productBrands, updateProductIds}:ProductFilter) {
    const [formData, setFormData] = useState({
        product: '',
        brand: '',
        price: '',
    });

    const [isSearchDisabled, setIsSearchDisabled] = useState(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const uniqueBrands = uniqueProductBrand(productBrands);

    const handleManageFilter = async (resetFilter: boolean) => {
        try {
            if(resetFilter) {
                setFormData({brand: "", price: "", product: ""});
                const productIds = await getIds();
                updateProductIds(productIds)
            } else {
                const productIds = await filterAndFetchProductIds();
                updateProductIds(productIds);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const filterAndFetchProductIds = async () => {
        const searchParams = {
            product: formData.product.trim() !== "" ? formData.product : undefined,
            brand: formData.brand !== "" ? formData.brand : undefined,
            price: formData.price.trim() !== "" ? parseFloat(formData.price) : undefined,
        };

        const filteredSearchParams = Object.fromEntries(
            Object.entries(searchParams).filter(([, value]) => value !== undefined && value !== "")
        );

        return await getFilterProducts(filteredSearchParams);
    };

    useEffect(() => {
        const hasNonEmptyFields = formData.product.trim() !== '' || formData.price !== '' || formData.brand !== '';

        setIsSearchDisabled(!hasNonEmptyFields);
    }, [formData]);


    return(
        <div className="filter container">
            <input
                className="filter-product"
                type="text"
                placeholder="Название"
                name="product"
                value={formData.product}
                onChange={handleInputChange}
            />
            <select
                className="filter-brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
            >
                <option value="">Бренд</option>
                {uniqueBrands.map((brand, index) => (
                    <option key={index} value={brand}>
                        {brand}
                    </option>
                ))}
            </select>
            <input
                className="filter-price"
                type="number"
                placeholder="Цена"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
            />
            <button className={`filter-button  ${!isSearchDisabled ? "product-button" : ""}`}
                    onClick={() => handleManageFilter(false)} disabled={isSearchDisabled}>
                <span>Поиск</span>
            </button>
            <button className={`filter-button  ${!isSearchDisabled ? "product-button" : ""}`} onClick={() => handleManageFilter(true)} disabled={isSearchDisabled}>
                <span>Сброс</span>
            </button>
        </div>
    )
}