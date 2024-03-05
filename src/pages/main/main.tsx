import ProductList from "../../widgets/product-list/product-list.tsx";
import Header from "../../widgets/header/header.tsx";
import "./main.css";
import Pagination from "../../features/pagination/pagination.tsx";
import {useEffect, useState} from "react";
import ProductFilter from "../../features/product-filter/product-filter.tsx";
import useFilterData from "../../shared/hooks/useFilterData.ts";
import {useProductIds} from "../../shared/hooks/useProductIds.ts";
import {ProductIds, ProductItems} from "../../shared/types/products.ts";
import {getIdsPage, getTotalPages} from "../../shared/utils/utils.ts";
import {getItems} from "../../shared/api/api.ts";

export default function Main() {
    const [currentPage, setCurrentPage] = useState(1);
    const {productIds, setProductIds} = useProductIds();
    const [productItems, setProductItems] = useState<ProductItems[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const [visiblePagination, setVisiblePagination] = useState<boolean>(false)

    const brand = useFilterData();

    useEffect(() => {
        setVisiblePagination(totalPages > 1 ? true : false);
    }, [totalPages, productItems]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    useEffect(() => {
        setProductItems([])
        if (productIds.length > 0) {
            const fetchProductData = async () => {
                try {
                    setLoading(true);
                    const idsPage = getIdsPage(currentPage, productIds);
                    const data = await getItems(idsPage);
                    setProductItems(data);
                    setTotalPages(getTotalPages(productIds.length))

                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                }
            };

            fetchProductData();
        }
    }, [productIds, currentPage]);


    const updateProductIds = async (newProductIds: ProductIds[]) => {
        try {
            setProductItems([]);
            setLoading(true);
            setProductIds(newProductIds);
            setTotalPages(getTotalPages(newProductIds.length));
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    }

    return(
        <>
            <Header/>
            <ProductFilter productBrands={brand} updateProductIds={updateProductIds}/>
            <ProductList productItems={productItems} loading={loading}/>
            {
                visiblePagination && (
                <Pagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={totalPages}/>
                )
            }
        </>
    )
}