import {Constant} from "../../shared/helper/constant";
import {ServiceError} from "../protos/generated/category/category_pb_service";
import {AccountSrcClient} from "../protos/generated/account/account_pb_service";
import {LoginRequestMessage, LoginResponseMessage} from "../protos/generated/account/account_pb";

export class AccountGrpcService {

    Login(Username: string, Password: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
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
                return resolve(response.getToken());
            });
        });
    }
}