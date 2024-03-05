import axios from 'axios';
import axiosRetry from "axios-retry";
import {getHeaders} from "../utils/utils.ts";
import {ProductFields, ProductIds, ProductItems, SearchParams} from "../types/products.ts";
import {API_URL, MAX_RETRY_ATTEMPTS, PRODUCT_LIMIT, PRODUCT_OFFSET} from "../constants/const.ts";

axiosRetry(axios, {
    retries: MAX_RETRY_ATTEMPTS,
    shouldResetTimeout: true,
});

const headers = getHeaders();

export const getIds = async (): Promise<ProductIds[]> => {
    try {
        const response = await axios.post(API_URL, {
            action: "get_ids",
            params: {"offset": PRODUCT_OFFSET, "limit": PRODUCT_LIMIT},
        }, {headers});

        return response.data.result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getItems = async (ids: ProductIds[]): Promise<ProductItems[]> => {
    try {
        const response = await axios.post(API_URL, {
            action: "get_items",
            params: {ids},
        }, {headers});

        return response.data.result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getFields = async ():Promise<ProductFields[]> => {
    try {
        const response = await axios.post(API_URL, {
            "action": "get_fields"
        }, {headers});

        return response.data.result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getBrands = async (field: string, limit?: number): Promise<string[]> => {
    try {
        const response = await axios.post(API_URL, {
            "action": "get_fields",
            "params": {"field": field, "offset": PRODUCT_OFFSET, "limit": limit}
        }, {headers});

        return response.data.result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getFilterProducts = async (params: SearchParams):Promise<ProductIds[]> => {
    try {
        const response = await axios.post(API_URL, {
            "action": "filter",
            "params": params
        }, {headers});

        return response.data.result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
