import {ProductIds, ProductItems} from "../types/products.ts";
import md5 from "md5";
import {PASSWORD, POSTS_PER_PAGE} from "../constants/const.ts";

export function uniqueProductItems(productItems: ProductItems[]) {
   return productItems.filter((product, index, self) => self.findIndex((item) => item.id === product.id) === index)
}

export function uniqueProductBrand(productBrand: string[]) {
   return [...new Set(productBrand.filter((brand) => brand !== null))];
}

export function getIdsPage(currentPage: number, productIds: ProductIds[]) {
   const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
   const endIndex = startIndex + POSTS_PER_PAGE;
   return productIds.slice(startIndex, endIndex);
}

export function getTotalPages(productIdsTotal: number, postsPerPage: number = POSTS_PER_PAGE) {
   return Math.ceil(productIdsTotal / postsPerPage);
}

export function generateAuthString() {
   const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
   const authString = md5(`${PASSWORD}_${timestamp}`);
   return authString;
}

export function getHeaders() {
   return {
      'X-Auth': generateAuthString(),
      'Content-Type': 'application/json',
   };
}