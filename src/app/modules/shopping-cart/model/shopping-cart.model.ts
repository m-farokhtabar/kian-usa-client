import {OrderModel} from "../../../core/models/Order/order-model";
export class ShoppingCartModel{
    Orders: OrderModel[] = [];
    Customer: string | null = null;
    PriceType: number | null = 0;
    DeliveryType: number | null = null;
    IOR: number | null = null;
    LandedPrice: number = 1;
    CurrentPriceIndex: number = 0;
    IsDeliveryDisabled: boolean = true;
    IsTariffDisabled: boolean = true;
    IsLandedPriceShow: boolean = false;
    Description: string = "";
    IsVisible: boolean = false;
    ShoppingCartSideButtonVisible: boolean = false;
}