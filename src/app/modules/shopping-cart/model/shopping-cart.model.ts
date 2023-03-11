import {OrderModel} from "../../../core/models/Order/order-model";

export class ShoppingCartModel{
    Orders: OrderModel[] = [];
    PriceType: number | null = 1; //1 => Sac
    Customer: string | null = null;
    DeliveryType: number | null = null;
    IOR: number | null = null;
    LandedPrice: number = 0;
    CurrentPriceIndex: number = 1; //Because Default on Sac so used second price
    IsDeliveryDisabled: boolean = true;
    IsTariffDisabled: boolean = true;
    IsLandedPriceShow: boolean = false;
    ConfirmedBy: string = "";
    PoNumber: string = "";
    Description: string = "";
    IsVisible: boolean = true;
    ShoppingCartSideButtonVisible: boolean = false;
}