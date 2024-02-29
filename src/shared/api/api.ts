import axios, {AxiosRequestConfig} from 'axios';
import md5 from 'md5';
import {ProductFields, ProductIds, ProductItems} from "../../entities/types/products.ts";

const apiUrl = 'https://api.valantis.store:41000/';
const password = 'Valantis';


const generateAuthString = () => {
    const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const authString = md5(`${password}_${timestamp}`);
    return authString;
};

export const getIds = async (offset: number, limit: number): Promise<ProductIds> => {
    const headers: AxiosRequestConfig['headers'] = {
        'X-Auth': generateAuthString(),
        'Content-Type': 'application/json',
    };

    const response = await axios.post(apiUrl, {
        action: "get_ids",
        params: {offset, limit},
    }, {headers});

    return response.data;
};

export const getItems = async (ids: string[]): Promise<ProductItems[]> => {
    const headers: AxiosRequestConfig['headers'] = {
        'X-Auth': generateAuthString(),
        'Content-Type': 'application/json',
    };

    const response = await axios.post(apiUrl, {
        action: "get_items",
        params: {ids},
    }, {headers});

    return response.data.result;
}

export const getFields = async ():Promise<ProductFields[]> => {
    const headers: AxiosRequestConfig['headers'] = {
        'X-Auth': generateAuthString(),
        'Content-Type': 'application/json',
    };

    const response = await axios.post(apiUrl, {
        "action": "get_fields"
    }, {headers})

    return response.data.result;
}

export const getBrands = async (field: string, offset: number): Promise<string[]> => {
    const headers: AxiosRequestConfig['headers'] = {
        'X-Auth': generateAuthString(),
        'Content-Type': 'application/json',
    };

    const response = await axios.post(apiUrl, {
        "action": "get_fields",
        "params": {"field": field, "offset": offset}
    }, {headers})

    return response.data.result;
}
