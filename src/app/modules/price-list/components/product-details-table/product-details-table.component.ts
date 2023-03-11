import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../../../core/models/product/product.model";
import {Tools} from "../../../../shared/helper/tools";
import {AuthService} from "../../../../core/models/account/auth.service";

@Component({
    selector: 'app-product-details-table',
    templateUrl: './product-details-table.component.html',
    styleUrls: ['./product-details-table.component.css']
})
export class ProductDetailsTableComponent implements OnInit {
    @Input() products: ProductModel[] = [];
    @Input() ProductPricesIndex: number[] = [];
    GetPriceFormat = Tools.GetPriceFormat;
    LandedPrices: (number|undefined)[] = [];

    constructor(public account:AuthService) {
    }

    ngOnInit(): void {
    }

    getPriceHeaderName(Index: number): string {
        if (Array.isArray(this.products) && this.products.length > 0) {
            return this.products[0].Prices[Index].Name;
        }
        return "";
    }

    OnCostChange(data: Event) {
        this.LandedPrices = [];
        if (Array.isArray(this.products) && this.products.length > 0) {
            if ((<HTMLInputElement>data.target).value != null) {
                const cost: number = +(<HTMLInputElement>data.target).value;
                for (let i = 0; i < this.products.length; i++) {
                    if (this.products[i].Cube != null && this.products[i].Prices[0].Value != null) {
                        //const LandedPrice: number | undefined = this.products[i].Prices[0].Value! + (this.products[i].Cube! * (cost / 2350));
                        const LandedPrice: number | undefined = Tools.ComputeLandedPrice(this.products[i].Prices[0].Value,this.products[i].Cube,cost);
                        this.LandedPrices.push(LandedPrice);
                    } else
                        this.LandedPrices.push(undefined);
                }
            }
        }
    }
    ThereIsAtLeastAProductWhichHasPermission(PriceName: string ) : boolean{
        let ShowThisPriceForAll = false;
        if (Array.isArray(this.products) && this.products.length>0) {
            this.products.forEach(x => {
                ShowThisPriceForAll = ShowThisPriceForAll || this.account.HasPermissionToShowPrice(x.PricePermissions, PriceName);
            });
        }
        return ShowThisPriceForAll;
    }
}
