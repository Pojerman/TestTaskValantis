import {useEffect, useState} from "react";
import {getBrands} from "../api/api.ts";
import {uniqueProductBrand} from "../utils/utils.ts";

const useFilterData = () => {
    const [brand, setBrand] = useState<string[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBrands("brand");
                const uniqueProductBrands = uniqueProductBrand(response);
                setBrand(uniqueProductBrands);
            } catch (error) {
                console.error(error);
                throw error;
            }
        }

        fetchData()
    }, []);

    return brand;
}

export default useFilterData;