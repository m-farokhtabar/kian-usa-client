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
import {SharedDataService} from "../../core/services/shareddata.service";
import {FactoryInfo} from "./model/FactoryInfo";

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, DoCheck {

    GetPriceFormat = Tools.GetPriceFormat;
    readonly CacheStoreKey: string = "_PriceList_ShoppingCart";
    readonly PriceTypes: PriceType[] = [new PriceType("China", 0), new PriceType("Sacramento", 1), new PriceType("Mix Container Landed To Door", 2)];
    readonly DeliveryTypes: DeliveryType[] = [new DeliveryType("Customer Forwarder", 0), new DeliveryType("WillCall", 1), new DeliveryType("KianUSA", 2)];
    readonly IOR: IORType[] = [new IORType("Tariff paid by Kian", 0), new IORType("Tariff paid by Customer", 1)];
    Customers: CustomersOfRepModel[] = [];
    CurrentDeliveryTypes: DeliveryType[] | null = null;
    CurrentIORs: IORType[] | null = null;

    PrevCartModel: string = "";
    CartModel: ShoppingCartModel = new ShoppingCartModel();
    PrevPriceType: number | null = 1;
    IsShoppingCartLoadFromStorage: boolean = false;

    @Input()
    public set NewOrders(NewOrders: OrderModel[]) {
        if (Array.isArray(NewOrders) && NewOrders.length > 0) {
            this.CheckFactoriesIfPriceIsFob(NewOrders);
            if (!this.CartModel.IsVisible)
                this.CartModel.IsVisible = true;
            NewOrders.forEach(x => {
                if (x.Price[0] != undefined && this.CartModel.PriceType == 0 /*Fob*/ && this.CartModel.IOR == 1 /*IOR Customer*/){
                    x.Price[0] = (x.Price[0] + 120) / 100;
                }
                const CurrentOrder = this.CartModel.Orders.find((Order) => {
                    return Order.ProductSlug == x.ProductSlug;
                });
                if (CurrentOrder != undefined) {
                    CurrentOrder.ProductSlug = x.ProductSlug;
                    CurrentOrder.Count += x.Count;
                    CurrentOrder.ProductName = x.ProductName;
                    CurrentOrder.Price = x.Price;
                    CurrentOrder.Pieces = x.Pieces;
                    CurrentOrder.Cubes = x.Cubes;
                    CurrentOrder.Factories = x.Factories;
                    CurrentOrder.Weight = x.Weight;
                } else {
                    this.CartModel.Orders.push(new OrderModel(x.ProductSlug, x.Count, x.ProductName, x.Price, x.Pieces, x.Cubes, x.Factories, x.Weight));
                }
            });
        }
    }

    CheckFactoriesIfPriceIsFob(NewOrders: OrderModel[]) {
        if (this.CartModel.PriceType == 0) //Fob
        {
            let AllFactories: FactoryInfo[] = [];
            NewOrders.forEach(x => {
                if (Array.isArray(x.Factories) && x.Factories.length > 0) {
                    x.Factories.forEach(f => AllFactories.push(new FactoryInfo(f, 0)));
                }
            });
            AllFactories = AllFactories.filter((item, i, ar) => ar.indexOf(item) === i);
            if (Array.isArray(AllFactories) && AllFactories.length > 0) {
                NewOrders.forEach(NewOrder => {
                    AllFactories.forEach(factoryCounter => {
                        if (Array.isArray(NewOrder.Factories) && NewOrder.Factories.length > 0) {
                            if (NewOrder.Factories.find((NOFact) => NOFact.toLowerCase() == factoryCounter.Name))
                                factoryCounter.Count++;
                        }
                    });
                });
                if (Array.isArray(this.CartModel.Orders) && this.CartModel.Orders.length > 0) {
                    this.CartModel.Orders.forEach(PrevOrder => {
                        AllFactories.forEach(factoryCounter => {
                            if (Array.isArray(PrevOrder.Factories) && PrevOrder.Factories.length > 0) {
                                if (PrevOrder.Factories.find((POFact) => POFact.toLowerCase() == factoryCounter.Name))
                                    factoryCounter.Count++;
                            }
                        });
                    });
                }
            }
            console.log(AllFactories);
        }
    }

    SendingData: boolean = false;

    constructor(public account: AuthService, private ShareData: SharedDataService) {
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
                if (!Array.isArray(data) || data.length == 0)
                {
                    this.Customers =[];
                    this.Customers.push(new CustomersOfRepModel(this.account.GetId() == null ? "" : this.account.GetId()!,
                                                                    this.account.GetName() == null ? "" : this.account.GetName()!,
                                                                    this.account.GetFamily()== null ? "" : this.account.GetFamily()!,
                                                                    this.account.GetUserName()== null ? "" : this.account.GetUserName()!));
                    this.CartModel.Customer = this.account.GetUserName();
                }
                else {
                    this.Customers = data;
                }
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
        //const Prices = this.account.GetPrices();
        let Pt: PriceType[] | null = null;
        //if (!Array.isArray(Prices) || Prices.length == 0)
          //  return Pt;
        Pt = [];
        //if (Prices.includes(0))
            Pt.push(this.PriceTypes[0]);
        //if (Prices.includes(1) || Prices.includes(2))
            Pt.push(this.PriceTypes[1]);
        //if (Prices.includes(999))
            Pt.push(this.PriceTypes[2]);
        return Pt;
    }
    OnChangePriceType(data:Event){
        if (Array.isArray(this.CartModel.Orders) && this.CartModel.Orders.length>0) {
            const result = confirm("Are you sure to change Price Type from (" + this.PriceTypes[this.PrevPriceType!].Name + ") to (" + this.PriceTypes[this.CartModel.PriceType!].Name + "). If you do that all items will be removed.");
            if (result == true) {
                this.CartModel.Orders = [];
                this.CartModel.LandedPrice = 0;
                this.ChangePriceType(+(<HTMLInputElement>data.target).value);
            } else {
                this.CartModel.PriceType = this.PrevPriceType;
                (<HTMLInputElement>data.target).value = this.PrevPriceType + "";
            }
        }
        else
        {
            this.CartModel.Orders = [];
            this.ChangePriceType(+(<HTMLInputElement>data.target).value);
        }
    }

    ChangePriceType(value: number) {
        this.ShareData.SetPriceType(this.CartModel.PriceType);
        this.PrevPriceType = this.CartModel.PriceType;
        this.CartModel.CurrentPriceIndex = value;
        this.CurrentIORs = [];
        this.CurrentDeliveryTypes = [];

        if (value == this.PriceTypes[0].Id) {  //FOB
            this.CartModel.IsTariffDisabled = false;
            this.CartModel.IsDeliveryDisabled = false;


            this.CurrentDeliveryTypes.push(this.DeliveryTypes[0]);
            //this.CurrentDeliveryTypes.push(this.DeliveryTypes[1]);
            this.CurrentDeliveryTypes.push(this.DeliveryTypes[2]);

            this.CurrentIORs.push(this.IOR[0]);
            this.CurrentIORs.push(this.IOR[1]);
        } else {
            this.CartModel.IsTariffDisabled = true;
            this.CartModel.IsDeliveryDisabled = true;
            this.CartModel.DeliveryType = null;
            this.CartModel.IOR = null;
        }

        // if (value == this.PriceTypes[1].Id) {
        //     this.CurrentDeliveryTypes = [];
        //     this.CurrentDeliveryTypes.push(this.DeliveryTypes[1]);
        //     this.CurrentDeliveryTypes.push(this.DeliveryTypes[2]);
        // }
        // if (value == this.PriceTypes[0].Id || +value == this.PriceTypes[2].Id) {
        //     if (this.CurrentDeliveryTypes == null || this.CurrentDeliveryTypes.length == 0 || this.CurrentDeliveryTypes[0].Id == this.DeliveryTypes[1].Id) {
        //         this.CurrentDeliveryTypes = [];
        //         this.CurrentDeliveryTypes.push(this.DeliveryTypes[0]);
        //         this.CurrentDeliveryTypes.push(this.DeliveryTypes[2]);
        //     }
        // }

        if (value == this.PriceTypes[2].Id)
            this.CartModel.IsLandedPriceShow = true;
        else
            this.CartModel.IsLandedPriceShow = false;

    }

    GetPrice(CurrentOrder: OrderModel): (number | undefined) {
        //LandedPrice
        if (this.CartModel.PriceType == this.PriceTypes[2].Id && this.CartModel.LandedPrice == 0) {
            return undefined;
        }
        else {
            let Price: number | undefined;
            if (this.CartModel.CurrentPriceIndex == 0) {
                if (this.CartModel.PriceType == 0 && this.CartModel.IOR == 1) //FOB IOR Customer
                {
                    Price = CurrentOrder.Price[0];
                    if (Price != undefined)
                        Price = Price - ((Price * 20) / 100);
                } else
                    Price = CurrentOrder.Price[0];
            } else if (this.CartModel.CurrentPriceIndex == 1) {
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
        if (this.CartModel.PriceType == this.PriceTypes[2].Id && this.CartModel.LandedPrice == 0)
            return undefined;
        else
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
             return Math.round(Cubes * 100) / 100;
         else
             return Cubes;
    }
    GetContainers(){
        let Cubes = this.GetCubes();
        if (Cubes != undefined)
            return Math.round((Cubes / 2400) * 100) / 100;
        else
            return "";
    }
    GetRoundContainers(){
        let Cubes = this.GetCubes();
        if (Cubes != undefined)
            return Math.ceil(Cubes / 2400);
        else
            return "";
    }
    GetWeight() : number | undefined{
        let Weight: number | undefined = undefined;
        if (Array.isArray(this.CartModel.Orders) && this.CartModel.Orders.length > 0) {
            Weight = 0;
            this.CartModel.Orders.forEach(x => {
                if (x.Weight != undefined)
                    Weight = Weight! + (x.Weight * x.Count);
            });
        }
        return Weight;
    }

    OnOrderCountChange(count: number, Order: OrderModel) {
        if (count == 0)
            this.CartModel.Orders.splice(this.CartModel.Orders.indexOf(Order), 1);
    }

    // OnLandedPriceChange(data: any) {
    //     this.CartModel.LandedPrice = data.target.value;
     // (input)="OnLandedPriceChange($event)"
    // }

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
        this.PrevPriceType = this.CartModel.PriceType;
        this.ShareData.SetPriceType(this.CartModel.PriceType);
        this.PrevCartModel = "";
        window.localStorage.removeItem(this.account.GetUserName() + this.CacheStoreKey);
    }

    OnSendOrdersClick() {
        const Cubes = this.GetCubes();
        if (this.CartModel.PriceType == 0 && (Cubes == undefined || Cubes<2300)) //China
        {
            alert("The minimum order of 'China' container is 2300");
            return;
        }
        else{
            if (this.CartModel.PriceType == 2 && (Cubes == undefined || Cubes<3500)) //Mix Container Landed To Door
            {
                alert("The minimum order of 'Mix container landed to Door' container  is 3500");
                return;
            }
        }
        this.SendingData = true;
        const OrderService = new OrderGrpcService(this.account);
        OrderService.SendOrder(this.CartModel).then(data => {
            alert(data[0]);
            //Means is ok
            if (data[1] == false) {
                //delete orders
                this.OnCancelOrders();
            }
            this.SendingData = false;
        }).catch(data => {
            alert(data);
            this.SendingData = false;
        });

    }
}
