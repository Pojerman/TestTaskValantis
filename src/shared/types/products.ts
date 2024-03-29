export interface ProductIds {
    result: string[];
}

export interface ProductItems {
    brand: string | null;
    id: string;
    price: number;
    product: string;
}

export interface ProductFields {
    field: string;
}

export interface SearchParams {
    product?: string;
    brand?: string
    price?: number;
}