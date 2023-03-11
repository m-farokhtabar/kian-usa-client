import {grpc} from "@improbable-eng/grpc-web";
import {AuthService} from "../models/account/auth.service";

export class ServiceHelper {
    public static CreateAuthToken(account: AuthService): grpc.Metadata | undefined {
        const metadata = new grpc.Metadata();
        const Token: string | null = account.getToken();
        if (Token != null) {
            metadata.append("Authorization", "Bearer " + Token);
            return metadata;
        } else
            return undefined;
    }
    public static CreateMessageBasedOnGrpcCodeError(error: any): (string|null) {
        if (error != null || error != undefined) {
            if (!error.message) {
                switch (error.code) {
                    case 16: {
                        return "You are not authorized to access this operation. Please login.";
                    }
                    default: {
                        return "There is an internal error. Please try later.";
                    }
                }
            } else {
                //UnKnown => throw exception in server
                if (error.code == 2) {
                    error.message = error.message.replace("Exception was thrown by handler. Exception: ", "");
                }
                return error.message;
            }
        } else
            return null;
    }
}