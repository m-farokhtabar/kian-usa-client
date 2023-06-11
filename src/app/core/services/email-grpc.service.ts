import {Constant} from "../../shared/helper/constant";
import {
    SendAdvancedCatalogRequest,
    SendCatalogRequestMessage, SendCatalogWithLandedPriceRequestMessage,
    SendContactUsRequestMessage,
    SendResponseMessage
} from "../protos/generated/email/email_pb";
import {EmailSrvClient} from "../protos/generated/email/email_pb_service";
import {ServiceError} from "../protos/generated/category/category_pb_service";
import {EmailCatalogModel} from "../models/email/email.catalog.model";
import {AuthService} from "../models/account/auth.service";
import {ServiceHelper} from "./service.helper";
import {EmailContactusModel} from "../models/email/email.contactus.model";
import {EmailCatalogWithLandedPriceModel} from "../models/email/email-catalog-with-landed-price.model";
import {EmailAdvancedCatalogModel} from "../models/email/email-advanced-catalog-model";

export class EmailGrpcService {
    constructor(private account: AuthService) {
    }

    SendCatalog(Model: EmailCatalogModel): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const client = new EmailSrvClient(Constant.ServiceHost);
            const request = new SendCatalogRequestMessage();
            request.setCategoryslug(Model.CategorySlug);
            request.setCustomeremail(Model.CustomerEmail);
            request.setCustomerfullname(Model.CustomerFullName);
            request.setWhichprice(Model.WhichPrice);
            const metadata = ServiceHelper.CreateAuthToken(this.account);
            if (metadata != undefined) {
                client.sendCatalog(request, metadata, (error: ServiceError | null, response: SendResponseMessage | null) => {
                    if (error != null) {
                        return reject();
                    }
                    if (response == null) {
                        return reject();
                    }
                    return resolve(response.getPutinemailqueue());
                });
            } else
                alert("Please login.");
        });
    }

    SendCatalogWithLandedPrice(Model: EmailCatalogWithLandedPriceModel): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const client = new EmailSrvClient(Constant.ServiceHost);
            const request = new SendCatalogWithLandedPriceRequestMessage();
            request.setCategoryslug(Model.CategorySlug);
            request.setCustomeremail(Model.CustomerEmail);
            request.setCustomerfullname(Model.CustomerFullName);
            request.setFactor(Model.Factor);
            const metadata = ServiceHelper.CreateAuthToken(this.account);
            if (metadata != undefined) {
                client.sendCatalogWithLandedPrice(request, metadata, (error: ServiceError | null, response: SendResponseMessage | null) => {
                    if (error != null) {
                        return reject();
                    }
                    if (response == null) {
                        return reject();
                    }
                    return resolve(response.getPutinemailqueue());
                });
            } else
                alert("Please login.");
        });
    }

    SendContactUs(Model: EmailContactusModel): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const client = new EmailSrvClient(Constant.ServiceHost);
            const request = new SendContactUsRequestMessage();
            request.setName(Model.Name);
            request.setFamily(Model.Family);
            request.setPhone(Model.Phone);
            request.setEmail(Model.Email);
            request.setComment(Model.Comment);
            //const metadata = ServiceHelper.CreateAuthToken(this.account);
            client.sendContactUs(request, (error: ServiceError | null, response: SendResponseMessage | null) => {
                if (error != null) {
                    return reject();
                }
                if (response == null) {
                    return reject();
                }
                return resolve(response.getPutinemailqueue());
            });
        });
    }
    SendAdvanceCatalog(Model: EmailAdvancedCatalogModel): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const client = new EmailSrvClient(Constant.ServiceHost);
            const request = new SendAdvancedCatalogRequest();
            request.setCategoriesslugList(Model.CategoriesSlug);
            request.setFactoriesList(Model.Factories);
            request.setPricesList(Model.Prices);
            request.setJustavailable(Model.JustAvailable);
            request.setLandedprice(Model.LandedPrice);
            request.setCustomerfullname(Model.CustomerFullName);
            request.setCustomeremail(Model.CustomerEmail);
            request.setIncludeextrapictures(Model.IncludeExtraPictures);
            request.setCustombodytext(Model.CustomTextBody);
            const metadata = ServiceHelper.CreateAuthToken(this.account);
            if (metadata != undefined) {
                client.sendCatalogAdvanced(request, metadata, (error: ServiceError | null, response: SendResponseMessage | null) => {
                    if (error != null) {
                        return reject();
                    }
                    if (response == null) {
                        return reject();
                    }
                    return resolve(response.getPutinemailqueue());
                });
            } else
                alert("Please login.");
        });
    }
}