import {Constant} from "../../shared/helper/constant";
import {ServiceError} from "../protos/generated/category/category_pb_service";
import {AccountSrcClient} from "../protos/generated/account/account_pb_service";
import {
    CustomersOfRepRequestMessage, CustomersOfRepResponseMessage,
    LoginRequestMessage,
    LoginResponseMessage
} from "../protos/generated/account/account_pb";
import {AuthService} from "../models/account/auth.service";
import {CustomersOfRepModel} from "../models/account/customers-of-rep-model";
import {ServiceHelper} from "./service.helper";
import {AccountModel} from "../models/account/account.model";

export class AccountGrpcService {
    constructor(private account: AuthService | null) {
    }

    Login(Username: string, Password: string): Promise<AccountModel> {
        return new Promise<AccountModel>((resolve, reject) => {
            const client = new AccountSrcClient(Constant.ServiceHost);
            const request = new LoginRequestMessage();
            request.setUsername(Username);
            request.setPassword(Password);

            client.login(request, (error: ServiceError | null, response: LoginResponseMessage | null) => {
                if (error != null) {
                    return reject(error?.message.replace("Exception was thrown by handler. Exception: ", ""));
                }
                if (response == null) {
                    return reject("Server does not response properly.");
                }
                return resolve(new AccountModel(response.getToken(), response.getPagesList(), response.getButtonsList()));
            });
        });
    }

    GetCustomersOfRep(RepUserName: string): Promise<CustomersOfRepModel[]> {
        return new Promise<CustomersOfRepModel[]>((resolve, reject) => {
            const client = new AccountSrcClient(Constant.ServiceHost);
            const request = new CustomersOfRepRequestMessage();
            request.setRepusername(RepUserName);
            const metadata = ServiceHelper.CreateAuthToken(this.account!);
            if (metadata != undefined) {
                client.getCustomersOfRep(request, metadata, (error: ServiceError | null, response: CustomersOfRepResponseMessage | null) => {
                    if (error != null) {
                        return reject();
                    }
                    if (response == null) {
                        return reject();
                    }
                    const result = response.getCustomersList().map(Customer => <CustomersOfRepModel>{
                        Family: Customer.getFamily(),
                        Name: Customer.getName(),
                        UserName: Customer.getUsername(),
                        Id: Customer.getId(),
                        StoreName: Customer.getStorename()
                    });
                    return resolve(result);
                });
            } else
                alert("Please login.");

        });
    }
}