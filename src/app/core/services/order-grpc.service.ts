import {AuthService} from "../models/account/auth.service";
import {Constant} from "../../shared/helper/constant";
import {ServiceHelper} from "./service.helper";
import {ServiceError} from "../protos/generated/category/category_pb_service";
import {OrderSrvClient} from "../protos/generated/order/order_pb_service";
import { OrderRequestMessage, OrderResponseMessage, ProductOrder } from "../protos/generated/order/order_pb";
import {ShoppingCartModel} from "../../modules/shopping-cart/model/shopping-cart.model";
import {OrderModel} from "../models/Order/order-model";

export class OrderGrpcService{
    constructor(private account: AuthService) {
    }

    SendOrder(Model: ShoppingCartModel): Promise<[string,boolean]> {
        return new Promise<[string,boolean]>((resolve,reject) =>{
            const client = new OrderSrvClient(Constant.ServiceHost);
            const request = new OrderRequestMessage();
            request.setCustomerusername(Model.Customer!);
            this.GetPriceType(request, Model.PriceType!);
            request.setCost(Model.LandedPrice);
            this.GetDelivery(request, Model.DeliveryType!);
            this.GetTariff(request, Model.IOR!);
            request.setDescription(Model.Description);
            this.GetOrders(request, Model.Orders);
            console.log(request);
            const metadata = ServiceHelper.CreateAuthToken(this.account);
            if (metadata != undefined) {
                client.sendOrder(request, metadata, (error: ServiceError | null, response: OrderResponseMessage | null) => {
                    if (error != null) {
                        return reject();
                    }
                    if (response == null) {
                        return reject();
                    }
                    return resolve([response.getMessage(),response.getIserror()]);
                });
            }
            else
                alert("Please login.");
        } );
    }

    private GetPriceType(request: OrderRequestMessage, PriceType: number){
        if (PriceType == 0)
            request.setPricetype(0);
        else if (PriceType == 1)
            request.setPricetype(1);
        else
            request.setPricetype(2);
    }
    private GetDelivery(request: OrderRequestMessage, DeliveryType: number){
        if (DeliveryType == 0)
            request.setDelivery(0);
        else if (DeliveryType == 1)
            request.setDelivery(1);
        else
            request.setDelivery(2);
    }
    private GetTariff(request: OrderRequestMessage, Tariff: number){
        if (Tariff == 0)
            request.setTariff(0);
        else
            request.setTariff(1);
    }
    private GetOrders(request: OrderRequestMessage, Orders: OrderModel[]){
        let RequestOrders: Array<ProductOrder> = [];
        Orders.forEach(x=> {
            const Ord: ProductOrder = new ProductOrder();
            Ord.setCount(x.Count);
            Ord.setProductid(x.ProductId);
            RequestOrders.push(Ord);
        });
        request.setOrdersList(RequestOrders);
    }
}