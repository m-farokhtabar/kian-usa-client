// package: 
// file: email.proto

import * as jspb from "google-protobuf";

export class SendCatalogRequestMessage extends jspb.Message {
  getCustomerfullname(): string;
  setCustomerfullname(value: string): void;

  getCustomeremail(): string;
  setCustomeremail(value: string): void;

  getCategoryslug(): string;
  setCategoryslug(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendCatalogRequestMessage.AsObject;
  static toObject(includeInstance: boolean, msg: SendCatalogRequestMessage): SendCatalogRequestMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendCatalogRequestMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendCatalogRequestMessage;
  static deserializeBinaryFromReader(message: SendCatalogRequestMessage, reader: jspb.BinaryReader): SendCatalogRequestMessage;
}

export namespace SendCatalogRequestMessage {
  export type AsObject = {
    customerfullname: string,
    customeremail: string,
    categoryslug: string,
  }
}

export class SendCatalogResponseMessage extends jspb.Message {
  getPutinemailqueue(): boolean;
  setPutinemailqueue(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendCatalogResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: SendCatalogResponseMessage): SendCatalogResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendCatalogResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendCatalogResponseMessage;
  static deserializeBinaryFromReader(message: SendCatalogResponseMessage, reader: jspb.BinaryReader): SendCatalogResponseMessage;
}

export namespace SendCatalogResponseMessage {
  export type AsObject = {
    putinemailqueue: boolean,
  }
}

