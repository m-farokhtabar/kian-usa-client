import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PriceType} from "./model/price-type";
import {AuthService} from "../../core/models/account/auth.service";
import {DeliveryType} from "./model/delivery-type";
import {IORType} from "./model/ior-type";
import {CustomersOfRepModel} from "../../core/models/account/customers-of-rep-model";
import {AccountGrpcService} from "../../core/services/account-grpc.service";
import {OrderModel} from "../../core/models/Order/order-model";
import {Tools} from "../../shared/helper/tools";
import {ShoppingCartModel} from "./model/shopping-cart.model";
import {OrderGrpcService} from 'src/app/core/services/order-grpc.service';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, DoCheck {

    GetPriceFormat = Tools.GetPriceFormat;
    readonly CacheStoreKey: string = "_PriceList_ShoppingCart";
    readonly PriceTypes: PriceType[] = [new PriceType("Fob", 0), new PriceType("Sac", 1), new PriceType("Landed Price", 2)];
    readonly DeliveryTypes: DeliveryType[] = [new DeliveryType("Customer Forwarder", 0), new DeliveryType("WillCall", 1), new DeliveryType("KianUSA", 2)];
    readonly IOR: IORType[] = [new IORType("IOR KIAN", 0), new IORType("IOR Customer", 1)];
    Customers: CustomersOfRepModel[] = [];
    CurrentDeliveryTypes: DeliveryType[] | null = null;
    CurrentIORs: IORType[] | null = null;

    PrevCartModel: string = "";
    CartModel: ShoppingCartModel = new ShoppingCartModel();
    IsShoppingCartLoadFromStorage: boolean = false;

    @Input()
    public set NewOrders(NewOrders: OrderModel[]) {
        if (Array.isArray(NewOrders) && NewOrders.length > 0) {
            if (!this.CartModel.IsVisible)
                this.CartModel.IsVisible = true;
            NewOrders.forEach(x => {
                const CurrentOrder = this.CartModel.Orders.find((Order) => {
                    return Order.ProductId == x.ProductId;
                });
                if (CurrentOrder != undefined) {
                    CurrentOrder.ProductId = x.ProductId;
                    CurrentOrder.Count += x.Count;
                    CurrentOrder.ProductName = x.ProductName;
                    CurrentOrder.Price = x.Price;
                    CurrentOrder.Pieces = x.Pieces;
                    CurrentOrder.Cubes = x.Cubes;
                } else {
                    this.CartModel.Orders.push(new OrderModel(x.ProductId, x.Count, x.ProductName, x.Price, x.Pieces, x.Cubes));
                }
            });
        }
    }

    SendingData: boolean = false;

    constructor(private account: AuthService) {
    }

    ngDoCheck() {
        if (this.IsShoppingCartLoadFromStorage) {
            const ShoppingCartModelStr = JSON.stringify(this.CartModel);
            if (this.PrevCartModel != ShoppingCartModelStr) {
                this.PrevCartModel = ShoppingCartModelStr;
                window.localStorage.setItem(this.account.GetUserName() + this.CacheStoreKey, this.PrevCartModel);
            }
        }
    }

    ngOnInit(): void {
        this.LoadCustomers();
    }


    LoadCustomers() {
        const AccountService = new AccountGrpcService(this.account);
        if (this.account.GetUserName() != null) {
            AccountService.GetCustomersOfRep(this.account.GetUserName()!).then(data => {
                this.Customers = data;
                this.LoadShoppingCart();
            }).catch(data => {
            });
        }
    }

    LoadShoppingCart() {
        const ShoppingCartModelStr: string | null = window.localStorage.getItem(this.account.GetUserName() + this.CacheStoreKey);
        if (ShoppingCartModelStr != null && ShoppingCartModelStr) {
            this.PrevCartModel = ShoppingCartModelStr;
            this.CartModel = JSON.parse(ShoppingCartModelStr);
            this.ChangePriceType(this.CartModel.CurrentPriceIndex);
        }
        this.IsShoppingCartLoadFromStorage = true;
    }

    OnSubmit(Form: NgForm) {
        if (Form.valid) {
            this.SendingData = true;
        }
    }

    GetPricesType(): PriceType[] | null {
        const Prices = this.account.GetPrices();
        let Pt: PriceType[] | null = null;
        if (!Array.isArray(Prices) || Prices.length == 0)
            return Pt;
        Pt = [];
        if (Prices.includes(0))
            Pt.push(this.PriceTypes[0]);
        if (Prices.includes(1) || Prices.includes(2))
            Pt.push(this.PriceTypes[1]);
        if (Prices.includes(999))
            Pt.push(this.PriceTypes[2]);
        return Pt;
    }

    OnChangePriceType(data: Event) {
        this.ChangePriceType(+(<HTMLInputElement>data.target).value);
    }

    ChangePriceType(value: number) {
        this.CartModel.IsDeliveryDisabled = false;
        this.CartModel.CurrentPriceIndex = value;
        this.CurrentIORs = [];
        if (value == this.PriceTypes[0].Id) {
            this.CartModel.IsTariffDisabled = false;
            this.CurrentIORs.push(this.IOR[0]);
            this.CurrentIORs.push(this.IOR[1]);
        } else {
            this.CartModel.IsTariffDisabled = true;
        }

        if (value == this.PriceTypes[1].Id) {
            this.CurrentDeliveryTypes = [];
            this.CurrentDeliveryTypes.push(this.DeliveryTypes[1]);
            this.CurrentDeliveryTypes.push(this.DeliveryTypes[2]);
        }
        if (value == this.PriceTypes[0].Id || +value == this.PriceTypes[2].Id) {
            if (this.CurrentDeliveryTypes == null || this.CurrentDeliveryTypes.length == 0 || this.CurrentDeliveryTypes[0].Id == this.DeliveryTypes[1].Id) {
                this.CurrentDeliveryTypes = [];
                this.CurrentDeliveryTypes.push(this.DeliveryTypes[0]);
                this.CurrentDeliveryTypes.push(this.DeliveryTypes[2]);
            }
        }

        if (value == this.PriceTypes[2].Id)
            this.CartModel.IsLandedPriceShow = true;
        else
            this.CartModel.IsLandedPriceShow = false;

    }

    GetPrice(CurrentOrder: OrderModel): (number | undefined) {
        let Price: number | undefined;
        if (this.CartModel.CurrentPriceIndex == 0)
            Price = CurrentOrder.Price[0];
        else if (this.CartModel.CurrentPriceIndex == 1) {
            if (CurrentOrder.Price[2] == undefined || CurrentOrder.Price[2] == null || CurrentOrder.Price[2] == 0)
                Price = CurrentOrder.Price[1];
            else
                Price = CurrentOrder.Price[2];
        } else if (this.CartModel.CurrentPriceIndex == 2) {
            Price = Tools.ComputeLandedPrice(CurrentOrder.Price[0], CurrentOrder.Cubes, this.CartModel.LandedPrice);
        } else
            Price = undefined;
        return Price;
    }

    GetTotalPrice(CurrentOrder: OrderModel): (number | undefined) {
        const Price = this.GetPrice(CurrentOrder);
        if (Price != undefined) {
            return Price * CurrentOrder.Count;
        } else
            return undefined;
    }

    GetAllTotalPrice(): number | undefined {
        let AllTotalPrices: number | undefined = undefined;
        if (Array.isArray(this.CartModel.Orders) && this.CartModel.Orders.length > 0) {
            AllTotalPrices = 0;
            this.CartModel.Orders.forEach(x => {
                const Price = this.GetPrice(x);
                if (Price != undefined)
                    AllTotalPrices = AllTotalPrices! + (Price * x.Count);
            });
        }
        return AllTotalPrices;
    }

    GetPieces() {
        let Pieces: number | undefined = undefined;
        if (Array.isArray(this.CartModel.Orders) && this.CartModel.Orders.length > 0) {
            Pieces = 0;
            this.CartModel.Orders.forEach(x => {
                Pieces = Pieces! + (x.Pieces * x.Count);
            });
        }
        return Pieces;
    }

    GetCubes() {
        let Cubes: number | undefined = undefined;
        if (Array.isArray(this.CartModel.Orders) && this.CartModel.Orders.length > 0) {
            Cubes = 0;
            this.CartModel.Orders.forEach(x => {
                if (x.Cubes != undefined)
                    Cubes = Cubes! + (x.Cubes * x.Count);
            });
        }
        if (Cubes != undefined)
            return Math.round(Cubes);
        else
            return Cubes;
    }

    OnOrderCountChange(count: number, Order: OrderModel) {
        if (count == 0)
            this.CartModel.Orders.splice(this.CartModel.Orders.indexOf(Order), 1);
    }

    OnLandedPriceChange(data: any) {
        this.CartModel.LandedPrice = data.target.value;
    }

    OnCloseButton() {
        this.CartModel.IsVisible = false;
        this.CartModel.ShoppingCartSideButtonVisible = true;
    }

    OnShoppingCartSideButtonClick() {
        if (!this.CartModel.IsVisible && this.CartModel.ShoppingCartSideButtonVisible) {
            this.CartModel.IsVisible = true;
            this.CartModel.ShoppingCartSideButtonVisible = false;
        }
    }

    OnCancelOrders() {
        this.CartModel = new ShoppingCartModel();
        this.PrevCartModel = "";
        window.localStorage.removeItem(this.account.GetUserName() + this.CacheStoreKey);
    }

    OnSendOrdersClick() {
        this.SendingData = true;
        const OrderService = new OrderGrpcService(this.account);
        OrderService.SendOrder(this.CartModel).then(data => {
            alert(data[0]);
            //Means is ok
            if (data[1] == false)
            {
                //delete orders
                this.OnCancelOrders();
            }
            this.SendingData = false;
        }).catch( data =>
        {
            alert(data);
            this.SendingData = false;
        });
    }
}
