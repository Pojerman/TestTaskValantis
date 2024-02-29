import {useEffect, useState} from "react";
import {getBrands} from "../../../shared/api/api.ts";
import {uniqueProductBrand} from "../../../shared/utils/utils.ts";

const useFilterData = () => {
    const [brand, setBrand] = useState<string[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBrands("brand", 0);
                const uniqueProductBrands = uniqueProductBrand(response);
                setBrand(uniqueProductBrands);
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, []);

    return {brand}
}

export default useFilterData;