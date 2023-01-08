import {AuthService} from "../models/account/auth.service";
import {grpc} from "@improbable-eng/grpc-web";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import {Constant} from "../../shared/helper/constant";
import {ServiceHelper} from "./service.helper";
import {GroupModel} from "../models/group/group.model";
import {GroupSrv} from "../protos/generated/group/group_pb_service";
import {GroupsResponseMessage} from "../protos/generated/group/group_pb";

export class GroupGrpcService{
    constructor(private account: AuthService) {
    }
    public GetAll(): Promise<GroupModel[]>{
        return new Promise<GroupModel[]>((resolve, reject) =>{
            grpc.unary(GroupSrv.GetAll, {
                request: new Empty(),
                host: Constant.ServiceHost,
                metadata: ServiceHelper.CreateAuthToken(this.account),
                onEnd: res => {
                    const {status, message} = res;
                    if (status === grpc.Code.OK && message) {
                        let result = message.toObject() as GroupsResponseMessage.AsObject;

                        if (result != null) {
                            const filters = result.groupsList.map(x=> <GroupModel>{
                                Id: x.id,
                                Name: x.name,
                                Order: x.order,
                                IsVisible: x.isvisible
                            });
                            return resolve(filters);
                        }
                        else
                            return reject();
                    }
                    else
                        return reject();
                }
            });
        });
    }
}