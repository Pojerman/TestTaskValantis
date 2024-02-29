import {ProductBrand, ProductItems} from "../../entities/types/products.ts";

export function uniqueProductItems(productItems: ProductItems[]) {
   return productItems.filter((product, index, self) => self.findIndex((item) => item.id === product.id) === index)
}

export function uniqueProductBrand(productBrand: ProductBrand[]) {
   return [...new Set(productBrand.filter((brand) => brand !== null))];
}
