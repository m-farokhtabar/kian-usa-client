import {grpc} from "@improbable-eng/grpc-web";
import {AuthService} from "../models/account/auth.service";

export class ServiceHelper{
    public static CreateAuthToken(account: AuthService) : grpc.Metadata | undefined{
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