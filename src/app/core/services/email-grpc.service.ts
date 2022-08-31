import {Constant} from "../../shared/helper/constant";
import {
    SendCatalogRequestMessage,
    SendContactUsRequestMessage,
    SendResponseMessage
} from "../protos/generated/email/email_pb";
import {EmailSrvClient} from "../protos/generated/email/email_pb_service";
import {ServiceError} from "../protos/generated/category/category_pb_service";
import {EmailCatalogModel} from "../models/email/email.catalog.model";
import {AccountModel} from "../models/account/account.model";
import {ServiceHelper} from "./service.helper";
import {EmailContactusModel} from "../models/email/email.contactus.model";

export class EmailGrpcService {
    constructor(private account: AccountModel) {
    }

    SendCatalog(Model: EmailCatalogModel): Promise<boolean> {
        return new Promise<boolean>((resolve,reject) =>{
            const client = new EmailSrvClient(Constant.ServiceHost);
            const request = new SendCatalogRequestMessage();
            request.setCategoryslug(Model.CategorySlug);
            request.setCustomeremail(Model.CustomerEmail);
            request.setCustomerfullname(Model.CustomerFullName);
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
            }
            else
                alert("Please login.");
        } );
    }
    SendContactUs(Model: EmailContactusModel): Promise<boolean> {
        return new Promise<boolean>((resolve,reject) =>{
            const client = new EmailSrvClient(Constant.ServiceHost);
            const request = new SendContactUsRequestMessage();
            request.setName(Model.Name);
            request.setFamily(Model.Family);
            request.setPhone(Model.Phone);
            request.setEmail(Model.Email);
            request.setComment(Model.Comment);
            const metadata = ServiceHelper.CreateAuthToken(this.account);
            if (metadata != undefined) {
                client.sendContactUs(request, metadata, (error: ServiceError | null, response: SendResponseMessage | null) => {
                    if (error != null) {
                        return reject();
                    }
                    if (response == null) {
                        return reject();
                    }
                    return resolve(response.getPutinemailqueue());
                });
            }
            else
                alert("Please login.");
        } );
    }

}