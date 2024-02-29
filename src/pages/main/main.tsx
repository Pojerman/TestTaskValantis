import ProductList from "../../features/product-list/product-list.tsx";
import useProductData from "./hooks/useProductData.ts";
import Header from "../../entities/header/header.tsx";
import "./main.css";
import Pagination from "../../features/pagination/pagination.tsx";
import {useEffect, useState} from "react";
import {ProductItems} from "../../entities/types/products.ts";
import ProductFilter from "../../features/product-filter/product-filter.tsx";
import useFilterData from "../../features/product-filter/hooks/useFilterData.ts";

export default function Main() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productItems, setProductItems] = useState<ProductItems[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [visiblePagination, setVisiblePagination] = useState<boolean>(false)


    const { productItems: fetchedProductItems } = useProductData(currentPage);

    const {brand} = useFilterData();

    useEffect(() => {
        setLoading(true);
        setProductItems(fetchedProductItems);
        setLoading(false);

    }, [currentPage, fetchedProductItems]);

    useEffect(() => {
        if (fetchedProductItems || visiblePagination) {
            setVisiblePagination(true);
        }
    }, [fetchedProductItems, visiblePagination]);

    return(
        <>
            <Header/>
            <ProductFilter  productBrands={brand}/>
            <ProductList productItems={productItems} loading={loading}/>
            {
                visiblePagination && (
                <Pagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={3}/>
                )
            }
        </>
    )
}