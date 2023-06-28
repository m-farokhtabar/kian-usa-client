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

  getName(): string;
  setName(value: string): void;

  getPonumber(): string;
  setPonumber(value: string): void;

  getEstimatenumber(): string;
  setEstimatenumber(value: string): void;

  getRequiredshippingdate(): string;
  setRequiredshippingdate(value: string): void;

  getCustomerpo(): string;
  setCustomerpo(value: string): void;

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

  getReadydate(): string;
  setReadydate(value: string): void;

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
  getRate(): google_protobuf_wrappers_pb.Int64Value | undefined;
  setRate(value?: google_protobuf_wrappers_pb.Int64Value): void;

  getEtd(): string;
  setEtd(value: string): void;

  getEta(): string;
  setEta(value: string): void;

  hasConfirmestatus(): boolean;
  clearConfirmestatus(): void;
  getConfirmestatus(): google_protobuf_wrappers_pb.Int32Value | undefined;
  setConfirmestatus(value?: google_protobuf_wrappers_pb.Int32Value): void;

  getConfirmdate(): string;
  setConfirmdate(value: string): void;

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
    name: string,
    ponumber: string,
    estimatenumber: string,
    requiredshippingdate: string,
    customerpo: string,
    itemgroup: string,
    forwarder: string,
    ior: string,
    shipto: string,
    shippingcarrier: string,
    containernumber: string,
    etaatport: string,
    factorystatus?: google_protobuf_wrappers_pb.Int32Value.AsObject,
    readydate: string,
    factorybookingdate: string,
    documentssendoutdate: string,
    forwardername?: google_protobuf_wrappers_pb.Int32Value.AsObject,
    bookingdate: string,
    rate?: google_protobuf_wrappers_pb.Int64Value.AsObject,
    etd: string,
    eta: string,
    confirmestatus?: google_protobuf_wrappers_pb.Int32Value.AsObject,
    confirmdate: string,
  }
}

export class PoResponse extends jspb.Message {
  clearExceldataList(): void;
  getExceldataList(): Array<PoData>;
  setExceldataList(value: Array<PoData>): void;
  addExceldata(value?: PoData, index?: number): PoData;

  clearColumnshavepermissionList(): void;
  getColumnshavepermissionList(): Array<string>;
  setColumnshavepermissionList(value: Array<string>): void;
  addColumnshavepermission(value: string, index?: number): string;

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
    columnshavepermissionList: Array<string>,
  }
}

