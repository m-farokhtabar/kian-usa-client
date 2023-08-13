// package: 
// file: po.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

export class PoData extends jspb.Message {
  getUser(): string;
  setUser(value: string): void;

  getDate(): string;
  setDate(value: string): void;

  getCustomerpo(): string;
  setCustomerpo(value: string): void;

  getEstimatenumber(): string;
  setEstimatenumber(value: string): void;

  getName(): string;
  setName(value: string): void;

  getPonumber(): string;
  setPonumber(value: string): void;

  getDuedate(): string;
  setDuedate(value: string): void;

  getItemgroup(): string;
  setItemgroup(value: string): void;

  getForwarder(): string;
  setForwarder(value: string): void;

  getIor(): string;
  setIor(value: string): void;

  getShipto(): string;
  setShipto(value: string): void;

  getShippingcarrier(): string;
  setShippingcarrier(value: string): void;

  getContainernumber(): string;
  setContainernumber(value: string): void;

  getEtaatport(): string;
  setEtaatport(value: string): void;

  hasFactorystatus(): boolean;
  clearFactorystatus(): void;
  getFactorystatus(): google_protobuf_wrappers_pb.Int32Value | undefined;
  setFactorystatus(value?: google_protobuf_wrappers_pb.Int32Value): void;

  getStatusdate(): string;
  setStatusdate(value: string): void;

  getFactorycontainernumber(): string;
  setFactorycontainernumber(value: string): void;

  getFactorybookingdate(): string;
  setFactorybookingdate(value: string): void;

  getDocumentssendoutdate(): string;
  setDocumentssendoutdate(value: string): void;

  hasForwardername(): boolean;
  clearForwardername(): void;
  getForwardername(): google_protobuf_wrappers_pb.Int32Value | undefined;
  setForwardername(value?: google_protobuf_wrappers_pb.Int32Value): void;

  getBookingdate(): string;
  setBookingdate(value: string): void;

  hasRate(): boolean;
  clearRate(): void;
  getRate(): google_protobuf_wrappers_pb.DoubleValue | undefined;
  setRate(value?: google_protobuf_wrappers_pb.DoubleValue): void;

  getEtd(): string;
  setEtd(value: string): void;

  getEta(): string;
  setEta(value: string): void;

  getPortofdischarge(): string;
  setPortofdischarge(value: string): void;

  hasDischargestatus(): boolean;
  clearDischargestatus(): void;
  getDischargestatus(): google_protobuf_wrappers_pb.Int32Value | undefined;
  setDischargestatus(value?: google_protobuf_wrappers_pb.Int32Value): void;

  hasShippmentstatus(): boolean;
  clearShippmentstatus(): void;
  getShippmentstatus(): google_protobuf_wrappers_pb.Int32Value | undefined;
  setShippmentstatus(value?: google_protobuf_wrappers_pb.Int32Value): void;

  getConfirmdate(): string;
  setConfirmdate(value: string): void;

  getGatein(): string;
  setGatein(value: string): void;

  getEmptydate(): string;
  setEmptydate(value: string): void;

  getGateout(): string;
  setGateout(value: string): void;

  getBilldate(): string;
  setBilldate(value: string): void;

  getFactorystatusneedstohavereadytogo(): boolean;
  setFactorystatusneedstohavereadytogo(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PoData.AsObject;
  static toObject(includeInstance: boolean, msg: PoData): PoData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PoData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PoData;
  static deserializeBinaryFromReader(message: PoData, reader: jspb.BinaryReader): PoData;
}

export namespace PoData {
  export type AsObject = {
    user: string,
    date: string,
    customerpo: string,
    estimatenumber: string,
    name: string,
    ponumber: string,
    duedate: string,
    itemgroup: string,
    forwarder: string,
    ior: string,
    shipto: string,
    shippingcarrier: string,
    containernumber: string,
    etaatport: string,
    factorystatus?: google_protobuf_wrappers_pb.Int32Value.AsObject,
    statusdate: string,
    factorycontainernumber: string,
    factorybookingdate: string,
    documentssendoutdate: string,
    forwardername?: google_protobuf_wrappers_pb.Int32Value.AsObject,
    bookingdate: string,
    rate?: google_protobuf_wrappers_pb.DoubleValue.AsObject,
    etd: string,
    eta: string,
    portofdischarge: string,
    dischargestatus?: google_protobuf_wrappers_pb.Int32Value.AsObject,
    shippmentstatus?: google_protobuf_wrappers_pb.Int32Value.AsObject,
    confirmdate: string,
    gatein: string,
    emptydate: string,
    gateout: string,
    billdate: string,
    factorystatusneedstohavereadytogo: boolean,
  }
}

export class PoResponse extends jspb.Message {
  clearExceldataList(): void;
  getExceldataList(): Array<PoData>;
  setExceldataList(value: Array<PoData>): void;
  addExceldata(value?: PoData, index?: number): PoData;

  clearColumnshavepermissionList(): void;
  getColumnshavepermissionList(): Array<PoColAccess>;
  setColumnshavepermissionList(value: Array<PoColAccess>): void;
  addColumnshavepermission(value?: PoColAccess, index?: number): PoColAccess;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PoResponse): PoResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PoResponse;
  static deserializeBinaryFromReader(message: PoResponse, reader: jspb.BinaryReader): PoResponse;
}

export namespace PoResponse {
  export type AsObject = {
    exceldataList: Array<PoData.AsObject>,
    columnshavepermissionList: Array<PoColAccess.AsObject>,
  }
}

export class PoColAccess extends jspb.Message {
  getColname(): string;
  setColname(value: string): void;

  getIswritable(): boolean;
  setIswritable(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PoColAccess.AsObject;
  static toObject(includeInstance: boolean, msg: PoColAccess): PoColAccess.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PoColAccess, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PoColAccess;
  static deserializeBinaryFromReader(message: PoColAccess, reader: jspb.BinaryReader): PoColAccess;
}

export namespace PoColAccess {
  export type AsObject = {
    colname: string,
    iswritable: boolean,
  }
}

export class PoDataSave extends jspb.Message {
  getPonumber(): string;
  setPonumber(value: string): void;

  hasFactorystatus(): boolean;
  clearFactorystatus(): void;
  getFactorystatus(): google_protobuf_wrappers_pb.Int32Value | undefined;
  setFactorystatus(value?: google_protobuf_wrappers_pb.Int32Value): void;

  getFactorycontainernumber(): string;
  setFactorycontainernumber(value: string): void;

  getDocumentssendoutdate(): string;
  setDocumentssendoutdate(value: string): void;

  hasForwardername(): boolean;
  clearForwardername(): void;
  getForwardername(): google_protobuf_wrappers_pb.Int32Value | undefined;
  setForwardername(value?: google_protobuf_wrappers_pb.Int32Value): void;

  getBookingdate(): string;
  setBookingdate(value: string): void;

  hasRate(): boolean;
  clearRate(): void;
  getRate(): google_protobuf_wrappers_pb.DoubleValue | undefined;
  setRate(value?: google_protobuf_wrappers_pb.DoubleValue): void;

  getEtd(): string;
  setEtd(value: string): void;

  getEta(): string;
  setEta(value: string): void;

  getPortofdischarge(): string;
  setPortofdischarge(value: string): void;

  hasDischargestatus(): boolean;
  clearDischargestatus(): void;
  getDischargestatus(): google_protobuf_wrappers_pb.Int32Value | undefined;
  setDischargestatus(value?: google_protobuf_wrappers_pb.Int32Value): void;

  hasShippmentstatus(): boolean;
  clearShippmentstatus(): void;
  getShippmentstatus(): google_protobuf_wrappers_pb.Int32Value | undefined;
  setShippmentstatus(value?: google_protobuf_wrappers_pb.Int32Value): void;

  getConfirmdate(): string;
  setConfirmdate(value: string): void;

  getGatein(): string;
  setGatein(value: string): void;

  getEmptydate(): string;
  setEmptydate(value: string): void;

  getGateout(): string;
  setGateout(value: string): void;

  getBilldate(): string;
  setBilldate(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PoDataSave.AsObject;
  static toObject(includeInstance: boolean, msg: PoDataSave): PoDataSave.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PoDataSave, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PoDataSave;
  static deserializeBinaryFromReader(message: PoDataSave, reader: jspb.BinaryReader): PoDataSave;
}

export namespace PoDataSave {
  export type AsObject = {
    ponumber: string,
    factorystatus?: google_protobuf_wrappers_pb.Int32Value.AsObject,
    factorycontainernumber: string,
    documentssendoutdate: string,
    forwardername?: google_protobuf_wrappers_pb.Int32Value.AsObject,
    bookingdate: string,
    rate?: google_protobuf_wrappers_pb.DoubleValue.AsObject,
    etd: string,
    eta: string,
    portofdischarge: string,
    dischargestatus?: google_protobuf_wrappers_pb.Int32Value.AsObject,
    shippmentstatus?: google_protobuf_wrappers_pb.Int32Value.AsObject,
    confirmdate: string,
    gatein: string,
    emptydate: string,
    gateout: string,
    billdate: string,
  }
}

export class PoDataSaveRequest extends jspb.Message {
  clearDataList(): void;
  getDataList(): Array<PoDataSave>;
  setDataList(value: Array<PoDataSave>): void;
  addData(value?: PoDataSave, index?: number): PoDataSave;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PoDataSaveRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PoDataSaveRequest): PoDataSaveRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PoDataSaveRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PoDataSaveRequest;
  static deserializeBinaryFromReader(message: PoDataSaveRequest, reader: jspb.BinaryReader): PoDataSaveRequest;
}

export namespace PoDataSaveRequest {
  export type AsObject = {
    dataList: Array<PoDataSave.AsObject>,
  }
}

export class PoSaveResponse extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  getIserror(): boolean;
  setIserror(value: boolean): void;

  clearResultsList(): void;
  getResultsList(): Array<PoSaveResult>;
  setResultsList(value: Array<PoSaveResult>): void;
  addResults(value?: PoSaveResult, index?: number): PoSaveResult;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PoSaveResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PoSaveResponse): PoSaveResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PoSaveResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PoSaveResponse;
  static deserializeBinaryFromReader(message: PoSaveResponse, reader: jspb.BinaryReader): PoSaveResponse;
}

export namespace PoSaveResponse {
  export type AsObject = {
    message: string,
    iserror: boolean,
    resultsList: Array<PoSaveResult.AsObject>,
  }
}

export class PoSaveResult extends jspb.Message {
  getPonumber(): string;
  setPonumber(value: string): void;

  getConfirmdate(): string;
  setConfirmdate(value: string): void;

  getStatusdate(): string;
  setStatusdate(value: string): void;

  getBookingdate(): string;
  setBookingdate(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PoSaveResult.AsObject;
  static toObject(includeInstance: boolean, msg: PoSaveResult): PoSaveResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PoSaveResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PoSaveResult;
  static deserializeBinaryFromReader(message: PoSaveResult, reader: jspb.BinaryReader): PoSaveResult;
}

export namespace PoSaveResult {
  export type AsObject = {
    ponumber: string,
    confirmdate: string,
    statusdate: string,
    bookingdate: string,
    message: string,
  }
}

