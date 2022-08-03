import {grpc} from "@improbable-eng/grpc-web";
import {AccountModel} from "../models/account/account.model";

export class ServiceHelper{
    public static CreateAuthToken(account: AccountModel) : grpc.Metadata | undefined{
        const metadata = new grpc.Metadata();
        const Token: string | null = account.getToken();
        if (Token != null) {
            metadata.append("Authorization", "Bearer " + Token);
            return metadata;
        }
        else
            return undefined;
    }
}