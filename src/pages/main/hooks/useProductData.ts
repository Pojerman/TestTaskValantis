import {useEffect, useState} from 'react';
import { getIds, getItems } from '../../../shared/api/api.ts';
import { ProductIds, ProductItems } from "../../../entities/types/products.ts";

const useProductData = (currentPage: number) => {
    const [productIds, setProductIds] = useState<ProductIds | null>(null);
    const [productItems, setProductItems] = useState<ProductItems[] | null>(null);
    const [retryAttempts, setRetryAttempts] = useState<number>(0);
    const maxRetryAttempts = 1;

    useEffect(() => {
        setProductItems(null);
        const fetchData = async () => {
            try {
                const offset = (currentPage - 1) * 50;
                const limit = 51;
                const response = await getIds(offset, limit);
                setProductIds(response);

                if (response) {
                    const items = await getItems(response.result);
                    setProductItems(items);
                }

            } catch (error) {
                if (retryAttempts < maxRetryAttempts) {
                    setRetryAttempts(retryAttempts + 1);
                }
            }
        };

        fetchData();
    }, [currentPage, retryAttempts]);

    return { productIds, productItems };
};

export default useProductData;
