import React, {SetStateAction, useEffect, useState} from "react";
import {getIds} from "../api/api.ts";
import {ProductIds} from "../types/products.ts";
import {getTotalPages} from "../utils/utils.ts";
import {POSTS_PER_PAGE} from "../constants/const.ts";

export const useProductIds = (): {productIds: ProductIds[]; totalPages: number, setProductIds:React.Dispatch<SetStateAction<ProductIds[]>>} => {
    const [productIds, setProductIds] = useState<ProductIds[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const fetchProductIds = async () => {
            try {
                const response = await getIds();
                setProductIds(response);
                setTotalPages(getTotalPages(response.length, POSTS_PER_PAGE));
            } catch (error) {
                console.error(error);
                throw error;
            }
        };

        fetchProductIds();
    }, []);
    return {productIds, totalPages, setProductIds}
}
