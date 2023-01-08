import {AuthService} from "../models/account/auth.service";
import {Constant} from "../../shared/helper/constant";
import {ServiceHelper} from "./service.helper";
import {ServiceError} from "../protos/generated/category/category_pb_service";
import {CatalogLandedPriceModel} from "../models/catalog/catalog-landed-price.model";
import {CatalogSrvClient} from "../protos/generated/catalog/catalog_pb_service";
import {CatalogResponseMessage, LandedPriceCatalogRequestMessage} from "../protos/generated/catalog/catalog_pb";

export class CatalogGrpcService {
    constructor(private account: AuthService) {
    }

    CreateCatalogWithLandedPrice(Model: CatalogLandedPriceModel): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            const client = new CatalogSrvClient(Constant.ServiceHost);
            const request = new LandedPriceCatalogRequestMessage();
            request.setCatalogslug(Model.CatalogSlug);
            request.setFactor(Model.Factor);
            const metadata = ServiceHelper.CreateAuthToken(this.account);
            if (metadata != undefined) {
                client.getLandedPriceCatalogUrl(request, metadata, (error: ServiceError | null, response: CatalogResponseMessage | null) => {
                    if (error != null) {
                        return reject();
                    }
                    if (response == null) {
                        return reject();
                    }
                    return resolve([response.getUrlall(), response.getUrlcurrent()]);
                });
            } else
                alert("Please login.");
        });
    }
}