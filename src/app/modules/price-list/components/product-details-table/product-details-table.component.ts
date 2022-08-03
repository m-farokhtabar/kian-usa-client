import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../../../core/models/product/product.model";
import {Tools} from "../../../../shared/helper/tools";

@Component({
    selector: 'app-product-details-table',
    templateUrl: './product-details-table.component.html',
    styleUrls: ['./product-details-table.component.css']
})
export class ProductDetailsTableComponent implements OnInit {
    @Input() products: ProductModel[] = [];
    @Input() ProductPricesIndex: number[] = [];
    GetPriceFormat = Tools.GetPriceFormat;

    constructor() {
    }

    ngOnInit(): void {
    }

    getPriceHeaderName(Index: number): string {
        if (Array.isArray(this.products) && this.products.length > 0) {
            return this.products[0].Prices[Index].Name;
        }
        return "";
    }
}
