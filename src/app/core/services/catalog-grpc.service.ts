import {AuthService} from "../models/account/auth.service";
import {Constant} from "../../shared/helper/constant";
import {ServiceHelper} from "./service.helper";
import {ServiceError} from "../protos/generated/category/category_pb_service";
import {CatalogLandedPriceModel} from "../models/catalog/catalog-landed-price.model";
import {CatalogSrvClient} from "../protos/generated/catalog/catalog_pb_service";
import {
    CatalogResponseMessage,
    DownloadAdvanceCatalogRequest, DownloadCatalogRequest, DownloadCatalogResponse,
    LandedPriceCatalogRequestMessage
} from "../protos/generated/catalog/catalog_pb";
import {DownloadAdvancedCatalogModel} from "../models/catalog/download-advanced-catalog-model";

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
    DownloadAdvanceCatalog(Model: DownloadAdvancedCatalogModel): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const client = new CatalogSrvClient(Constant.ServiceHost);
            const request = new DownloadAdvanceCatalogRequest();
            request.setCategoriesslugList(Model.CategoriesSlug);
            request.setFactoriesList(Model.Factories);
            request.setPricesList(Model.Prices);
            request.setJustavailable(Model.JustAvailable);
            request.setLandedprice(Model.LandedPrice);
            const metadata = ServiceHelper.CreateAuthToken(this.account);
            if (metadata != undefined) {
                client.downloadAdvanceCatalog(request, metadata, (error: ServiceError | null, response: DownloadCatalogResponse | null) => {
                    if (error != null) {
                        return reject();
                    }
                    if (response == null) {
                        return reject();
                    }
                    return resolve(response.getUrl());
                });
            } else
                alert("Please login.");
        });
    }
    DownloadCatalog(catSlug:string,factor: number,prices: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const client = new CatalogSrvClient(Constant.ServiceHost);
            const request = new DownloadCatalogRequest();
            request.setCategoryslug(catSlug);
            request.setFactor(factor);
            request.setPrices(prices);
            const metadata = ServiceHelper.CreateAuthToken(this.account);
            if (metadata != undefined) {
                client.downloadCatalog(request, metadata, (error: ServiceError | null, response: DownloadCatalogResponse | null) => {
                    if (error != null) {
                        return reject();
                    }
                    if (response == null) {
                        return reject();
                    }
                    return resolve(response.getUrl());
                });
            } else
                alert("Please login.");
        });
    }

}