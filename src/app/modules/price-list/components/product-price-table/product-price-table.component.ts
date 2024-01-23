import {Component, ElementRef, Input, OnInit, Output, ViewChildren, EventEmitter} from '@angular/core';
import {ProductModel} from "../../../../core/models/product/product.model";
import {Tools} from "../../../../shared/helper/tools";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../../core/models/account/auth.service";
import {ProductPriceModel} from "../../../../core/models/product/product-price.model";
import {OrderModel} from "../../../../core/models/Order/order-model";
import {Subscription} from "rxjs";
import {SharedDataService} from "../../../../core/services/shareddata.service";
import {CategoryModel} from "../../../../core/models/category/category.model";

@Component({
    selector: 'product-price-table',
    templateUrl: './product-price-table.component.html',
    styleUrls: ['./product-price-table.component.css']
})
export class ProductPriceTableComponent implements OnInit {
    @Input() products: ProductModel[] = [];
    @Input() CategorySlug: string = "";
    @Input() CategoryName: string = "";
    @Input() Category: CategoryModel | null = null;
    @ViewChildren("orderInput") orderElements: Array<ElementRef> = [];
    Order: string = "";
    Cube: string = "";
    IsOrderTotalMessageVisible: boolean = false;
    GetPriceFormat = Tools.GetPriceFormat;
    @Input() ShowDownloadButton: boolean = true;
    @Input() ShowEmailButton: boolean = true;
    @Input() UseSmallFontSize: boolean = true;


    CurrentOrders: OrderModel[] = [];
    @Output() CurrentOrdersCreated = new EventEmitter<OrderModel[]>();

    private CurrentPriceType: number | null = 1; //Sac
    private PriceTypeSub: Subscription | null = null;

    constructor(private route: ActivatedRoute, public account: AuthService, private ShareData: SharedDataService) {
        this.PriceTypeSub = ShareData.PriceTypeObservable.subscribe(data => {
            this.CurrentPriceType = data;
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(() => this.ResetOrders());
    }

    ngOnDestroy(): void {
        this.PriceTypeSub?.unsubscribe();
    }

    getHeaderNames(): string[] {
        if (Array.isArray(this.products) && this.products.length > 0) {
            const product = this.products[0];
            if (Array.isArray(product.Prices)) {
                if (product.Prices.length > 1) {
                    return [product.Prices[0].Name, product.Prices[1].Name];
                } else if (this.products.length === 1) {
                    if (product.Prices[0])
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
                const Id = parseInt(order.nativeElement.id.replace(this.CategorySlug + "_", ""));
                const orderCount = parseInt(order.nativeElement.value);
                sumCol1 += ((this.products[Id].Prices[0].Value ?? 0) * orderCount);
                sumCol2 += ((this.GetSacPrice(this.products[Id].Prices)) * orderCount);
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

    GetSacPrice(Prices: Array<ProductPriceModel>): number {
        if (Prices.length > 2 && Prices[2].Value != undefined && Prices[2].Value > 0) {
            return Prices[2].Value;
        } else {
            if (Prices.length > 1 && Prices[1].Value != undefined)
                return Prices[1].Value;
        }
        return 0;
    }

    OnAddOrdersButton(): void {        
        this.CurrentOrders = [];
        let HasError = false;
        if (this.orderElements.length > 0) {
            this.orderElements.forEach(orderElement => {
                //debugger;
                const Id = parseInt(orderElement.nativeElement.id.replace(this.CategorySlug + "_", ""));
                const orderCount = parseInt(orderElement.nativeElement.value);
                const Prices = this.products[Id].Prices.map((x) => {
                    return x.Value;
                });
                if (orderCount > 0) {
                    if (this.IsItemAvailable(this.products[Id]))
                    {                        
                        this.CurrentOrders.push(new OrderModel(this.products[Id].Slug, orderCount, this.products[Id].Name, Prices, this.products[Id].PiecesCount, this.products[Id].Cube, this.products[Id].Factories, this.products[Id].Weight,this.products[Id].CategoryIds));
                    }
                    else {
                        alert(this.products[Id].Name + " is not available any more.");
                        HasError = true;
                        return;
                    }
                }
            });
            if (!HasError && Array.isArray(this.CurrentOrders) && this.CurrentOrders.length > 0)
                this.CurrentOrdersCreated.emit(this.CurrentOrders);
        }
        if (!HasError)
            this.ResetOrders();
    }

    ResetOrders() {
        this.CurrentOrders = [];
        this.IsOrderTotalMessageVisible = false;
        this.Order = "";
        this.Cube = "";
        if (this.orderElements.length > 0) {
            this.orderElements.forEach(orderElement => {
                orderElement.nativeElement.value = 0;
            });
        }
    }

    MakeItBold(ProductName: string) {
        if (ProductName.toLowerCase().indexOf("s/l") > 0 || ProductName.toLowerCase().indexOf("sec") > 0 || ProductName.toLowerCase().indexOf("chaise-bed") > 0)
            return "bold";
        else
            return "normal";
    }

    AccessToPriceIsValid(PriceName: string): boolean {
        let ShowThisPriceForAll = false;
        if (Array.isArray(this.products) && this.products.length>0) {
            this.products.forEach(x => {
                ShowThisPriceForAll = ShowThisPriceForAll || this.account.HasPermissionToShowPrice(x.PricePermissions, PriceName);
            });
        }
        return ShowThisPriceForAll;
    }

    IsItemAvailable(Product: ProductModel) {
        if (this.CurrentPriceType == 3) //3 = Sample
            return Product.IsSample && Product.IsSample.trim() == "1";
        else {
            if (this.CurrentPriceType == 1 || this.CurrentPriceType == 2) //1 = Sacramento/Fob, 2 = Mix Container Landed To Door
            {
                return this.CheckAvailabilityOfPrices(Product) && Product.WHQTY && Product.WHQTY.toLowerCase().trim() == "available";
            } else
                return this.CheckAvailabilityOfPrices(Product);
        }
    }

    CheckAvailabilityOfPrices(Product: ProductModel): boolean {
        if (Array.isArray(Product.Prices) && Product.Prices.length > 0) {
            //Fob LandedPrice
            if (this.CurrentPriceType == 0 || this.CurrentPriceType == 2) {
                return !(Product.Prices[0] == null || Product.Prices[0] == undefined || Product.Prices[0].Value == undefined);
                //Sac
            } else if (this.CurrentPriceType == 1 || this.CurrentPriceType == 3) {
                return !((Product.Prices[1] == null || Product.Prices[1] == undefined || Product.Prices[1].Value == undefined) &&
                    (Product.Prices[2] == null || Product.Prices[2] == undefined || Product.Prices[2].Value == undefined));
            } else
                return true;
        } else
            return false;
    }
    public HasPermissionToShowQuantity(): boolean {
        return this.account.HasPermissionToShowQuantity();
    }
    public HasPermissionToOrder(): boolean {
        return this.account.HasPermissionToOrder();
    }
}
