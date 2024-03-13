import {AuthService} from "../models/account/auth.service";
import {Constant} from "../../shared/helper/constant";
import {ServiceHelper} from "./service.helper";
import {ServiceError} from "../protos/generated/category/category_pb_service";
import {OrderSrvClient} from "../protos/generated/order/order_pb_service";
import { OrderRequestMessage, OrderResponseMessage, ProductOrder } from "../protos/generated/order/order_pb";
import {ShoppingCartModel} from "../../modules/shopping-cart/model/shopping-cart.model";
import {OrderModel} from "../models/Order/order-model";
import { Int32Value } from "google-protobuf/google/protobuf/wrappers_pb";

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
            request.setConfirmedby(Model.ConfirmedBy);
            request.setDescription(Model.Description);
            request.setPonumber(Model.PoNumber);
            request.setAdddiscounttosample(Model.AddDiscountToSample);
            request.setMarketspecial(Model.MarketSpecial);            
            if (Model.CountOfCustomerShareAContainer != null)
            {
                const countOfCustomerShareAContainer = new Int32Value();
                countOfCustomerShareAContainer.setValue(+Model.CountOfCustomerShareAContainer);
                request.setCountofcustomershareacontainer(countOfCustomerShareAContainer);
            }
            this.GetOrders(request, Model.Orders);

            const metadata = ServiceHelper.CreateAuthToken(this.account);
            if (metadata != undefined) {
                client.sendOrder(request, metadata, (error: ServiceError | null, response: OrderResponseMessage | null) => {
                    if (error != null) {
                        return reject(ServiceHelper.CreateMessageBasedOnGrpcCodeError(error));
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
        if (PriceType == 3)
            request.setPricetype(3);
        else if (PriceType == 2)
            request.setPricetype(2);
        else if (PriceType == 1)
            request.setPricetype(1);
        else
            request.setPricetype(0);
    }
    private GetDelivery(request: OrderRequestMessage, DeliveryType: number){
        if (DeliveryType == 2)
            request.setDelivery(2);
        else if (DeliveryType == 1)
            request.setDelivery(1);
        else
            request.setDelivery(0);
    }
    private GetTariff(request: OrderRequestMessage, Tariff: number){
        if (Tariff == 1)
            request.setTariff(1);
        else
            request.setTariff(0);
    }
    private GetOrders(request: OrderRequestMessage, Orders: OrderModel[]){
        let RequestOrders: Array<ProductOrder> = [];
        Orders.forEach(x=> {
            const Ord: ProductOrder = new ProductOrder();
            Ord.setCount(x.Count);
            Ord.setProductslug(x.ProductSlug);
            RequestOrders.push(Ord);
        });
        request.setOrdersList(RequestOrders);
    }
}