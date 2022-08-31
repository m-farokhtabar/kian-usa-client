import {AccountModel} from "../models/account/account.model";
import {FilterModel} from "../models/filter/filter.model";
import {grpc} from "@improbable-eng/grpc-web";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import {Constant} from "../../shared/helper/constant";
import {ServiceHelper} from "./service.helper";
import {FilterSrv} from "../protos/generated/filter/filter_pb_service";
import {FiltersResponseMessage} from "../protos/generated/filter/filter_pb";

export class FilterGrpcService{
    constructor(private account: AccountModel) {
    }
    public GetAll(): Promise<FilterModel[]>{
        return new Promise<FilterModel[]>((resolve, reject) =>{
            grpc.unary(FilterSrv.GetAll, {
                request: new Empty(),
                host: Constant.ServiceHost,
                metadata: ServiceHelper.CreateAuthToken(this.account),
                onEnd: res => {
                    const {status, message} = res;
                    if (status === grpc.Code.OK && message) {
                        let result = message.toObject() as FiltersResponseMessage.AsObject;

                        if (result != null) {
                            const filters = result.filtersList.map(x=> <FilterModel>{
                                Id: x.id,
                                Name: x.name,
                                Order: x.order,
                                Tags: x.tagsList
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