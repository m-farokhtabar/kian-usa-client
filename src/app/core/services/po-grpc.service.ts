import {AuthService} from "../models/account/auth.service";
import {PoDataModel} from "../models/po/po-data-model"
import { grpc } from "@improbable-eng/grpc-web";
import { PoSrv } from "../protos/generated/po/po_pb_service";
import { Constant } from "src/app/shared/helper/constant";
import {ServiceHelper} from "./service.helper";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import { PoResponse } from "../protos/generated/po/po_pb";
import { PoDataExcelModel } from "../models/po/po-data-excel-model";

export class PoGrpcService{
    constructor(private account: AuthService) {
    }
    public Get(): Promise<PoDataModel>{    
        return new Promise<PoDataModel>((resolve,reject)=>{
            grpc.unary(PoSrv.Get,{
                request: new Empty(),
                host: Constant.ServiceHost,
                metadata: ServiceHelper.CreateAuthToken(this.account),
                onEnd: res =>{                    
                    const {status, message} = res;
                    console.log(res);
                    if (status === grpc.Code.OK && message) {                        
                        let result = message.toObject() as PoResponse.AsObject;
                        if (result != null)
                        {                            
                            const  excelData = result.exceldataList.map(x=> <PoDataExcelModel>{                                
                                User: x.user,
                                Date:x.date,
                                Name: x.name,
                                PONumber: x.ponumber,
                                EstimateNumber: x.estimatenumber,
                                RequiredShippingDate: x.requiredshippingdate,                                    
                                CustomerPO: x.customerpo,
                                ItemGroup: x.itemgroup,
                                Forwarder: x.forwarder,
                                IOR: x.ior,
                                ShipTo: x.shipto,
                                ShippingCarrier: x.shippingcarrier,
                                ContainerNumber: x.containernumber,
                                ETAAtPort: x.etaatport,                            
                                FactoryStatus: x.factorystatus,
                                ReadyDate: x.readydate,
                                FactoryBookingDate : x.factorybookingdate,
                                DocumentsSendOutDate: x.documentssendoutdate,
                                ForwarderName: x.forwardername,
                                BookingDate:x.bookingdate,
                                Rate:x.rate,
                                ETD:x.etd,
                                ETA:x.eta,
                                ConfirmeStatus: x.confirmestatus,
                                ConfirmDate: x.confirmdate
                            });
                            const poData = new PoDataModel(excelData,result.columnshavepermissionList);
                            return resolve(poData);
                        }
                        return reject();
                    }
                }
            });
        });
    }

}