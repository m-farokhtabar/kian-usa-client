import {AuthService} from "../models/account/auth.service";
import {PoDataModel} from "../models/po/po-data-model"
import { grpc } from "@improbable-eng/grpc-web";
import { PoSrv, PoSrvClient } from "../protos/generated/po/po_pb_service";
import { Constant } from "src/app/shared/helper/constant";
import {ServiceHelper} from "./service.helper";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import { PoDataSave, PoDataSaveRequest, PoGetRequest, PoResponse, PoSaveResponse } from "../protos/generated/po/po_pb";
import { PoDataExcelModel } from "../models/po/po-data-excel-model";
import { ServiceError } from "../protos/generated/category/category_pb_service";
import { PoPermissionColumn } from "../models/po/po-permission-column";
import { PoSaveResultModel } from "../models/po/po-save-result-model";

export class PoGrpcService{
    constructor(private account: AuthService) {
    }
    public Get(isArchive : boolean): Promise<PoDataModel>{ 
        const req = new PoGetRequest();
        req.setIsarchive(isArchive);
        return new Promise<PoDataModel>((resolve,reject)=>{
            grpc.unary(PoSrv.Get,{
                request: req,
                host: Constant.ServiceHost,
                metadata: ServiceHelper.CreateAuthToken(this.account),
                onEnd: res =>{                    
                    const {status, message} = res;                    
                    if (status === grpc.Code.OK && message) {                        
                        let result = message.toObject() as PoResponse.AsObject;
                        if (result != null)
                        {                            
                            const excelData = result.exceldataList.map(x=> new PoDataExcelModel                                
                                (x.user,
                                x.date,
                                x.customerpo,
                                x.estimatenumber,
                                x.name,
                                x.ponumber,
                                x.duedate,                                
                                x.itemgroup,
                                x.forwarder,
                                x.ior,
                                x.shipto,
                                x.shippingcarrier,
                                x.containernumber,
                                x.etaatport,                            
                                x.factorystatus?.value,
                                x.statusdate,
                                x.factorycontainernumber,
                                x.factorybookingdate,
                                x.documentssendoutdate,
                                x.forwardername?.value,
                                x.bookingdate,
                                x.rate?.value,
                                x.etd,
                                x.eta,
                                x.portofdischarge,
                                x.dischargestatus?.value,
                                x.shippmentstatus?.value,
                                x.confirmdate,
                                x.gatein,
                                x.emptydate,
                                x.gateout,
                                x.billdate,
                                x.factorystatusneedstohavereadytogo));
                            const perms =  result.columnshavepermissionList.map(x=> new PoPermissionColumn(x.colname,x.iswritable));
                            const poData = new PoDataModel(excelData,perms);
                            return resolve(poData);
                        }
                        return reject();
                    }
                }
            });
        });
    }
    public Save(values: PoDataSave[]): Promise<[string,boolean, Array<PoSaveResultModel>]> {
        return new Promise<[string,boolean, Array<PoSaveResultModel>]>((resolve,reject) =>{            
            const client = new PoSrvClient(Constant.ServiceHost);
            const request = new PoDataSaveRequest();
            request.setDataList(values);
            const metadata = ServiceHelper.CreateAuthToken(this.account);
            if (metadata != undefined) {
                client.save(request, metadata, (error: ServiceError | null, response: PoSaveResponse | null) => {
                    if (error != null) {
                        return reject(ServiceHelper.CreateMessageBasedOnGrpcCodeError(error));
                    }
                    if (response == null) {
                        return reject();
                    }
                    var results = response.getResultsList().map(x=> new PoSaveResultModel(x.getPonumber(),x.getConfirmdate(),x.getStatusdate(),x.getBookingdate(),x.getMessage(),x.getFactorystatusneedstohavereadytogo(), x.getRate()?.getValue()));
                    return resolve([response.getMessage(),response.getIserror(), results]);
                });
            }
            else
                alert("Please login.");
        } );
    }
}