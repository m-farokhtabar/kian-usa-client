import {ProductModel} from "./product.model";

export class ProductWithPagingModel{
    constructor(Products: ProductModel[], TotalProducts: number) {
        this.Products = Products;
        this.TotalProducts = TotalProducts;
    }

    public Products: ProductModel[];
    public TotalProducts: number;
}