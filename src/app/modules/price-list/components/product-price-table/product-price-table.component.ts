import {Component, ElementRef, Input, OnInit, ViewChildren} from '@angular/core';
import {ProductModel} from "../../../../core/models/product/product.model";
import {Tools} from "../../../../shared/helper/tools";
import {CategoryModel} from "../../../../core/models/category/category.model";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'product-price-table',
    templateUrl: './product-price-table.component.html',
    styleUrls: ['./product-price-table.component.css']
})
export class ProductPriceTableComponent implements OnInit {
    @Input() products: ProductModel[] = [];
    @Input() CategorySlug: string = "";
    @Input() CategoryName: string = "";
    @ViewChildren("orderInput") orderElements: Array<ElementRef> = [];
    Order: string = "";
    Cube: string = "";
    IsOrderTotalMessageVisible: boolean = false;
    GetPriceFormat = Tools.GetPriceFormat;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(()=> this.OnResetOrdersButton());
    }

    getHeaderNames(): string[] {
        if (Array.isArray(this.products) && this.products.length > 0) {
            const product = this.products[0];
            if (Array.isArray(product.Prices)) {
                if (product.Prices.length > 1) {
                    return [product.Prices[0].Name, product.Prices[1].Name];
                } else if (this.products.length === 1) {
                    return [product.Prices[0].Name];
                }
            }
        }
        return [];
    }

    onChangeOrder(): void {
        let sumCol1: number = 0;
        let sumCol2: number = 0;
        let sumCube: number = 0;
        if (this.orderElements.length > 0) {
            this.orderElements.forEach(order => {
                const Id = parseInt(order.nativeElement.id.replace(this.CategorySlug+"_",""));
                const orderCount = parseInt(order.nativeElement.value);
                sumCol1 += ((this.products[Id].Prices[0].Value ?? 0) * orderCount);
                sumCol2 += ((this.products[Id].Prices[1].Value ?? 0) * orderCount);
                sumCube += ((this.products[Id].Cube ?? 0) * orderCount);
            });
        }
        let Message: string = "";
        if (sumCol1 > 0 && sumCol2 > 0)
            Message = this.getHeaderNames()[0] + " is " + Tools.GetPriceFormat(sumCol1) + " - " + this.getHeaderNames()[1] + " is " + Tools.GetPriceFormat(sumCol2);
        else if (sumCol1 > 0)
            Message = this.getHeaderNames()[0] + " is " + Tools.GetPriceFormat(sumCol1);
        else if (sumCol2 > 0)
            Message += this.getHeaderNames()[1] + " is " + Tools.GetPriceFormat(sumCol2);
        this.IsOrderTotalMessageVisible = (Message !== "");
        this.Order = Message;
        this.Cube = sumCube.toFixed(2) + "";
    }
    OnResetOrdersButton() : void {
        this.IsOrderTotalMessageVisible = false;
        this.Order = "";
        this.Cube = "";
        if (this.orderElements.length > 0) {
            this.orderElements.forEach(orderElement =>
            {
                orderElement.nativeElement.value = 0;
            });
        }
    }
}
