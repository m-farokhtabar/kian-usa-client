// package: 
// file: catalog.proto

import * as jspb from "google-protobuf";

export class LandedPriceCatalogRequestMessage extends jspb.Message {
  getCatalogslug(): string;
  setCatalogslug(value: string): void;

  getFactor(): number;
  setFactor(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LandedPriceCatalogRequestMessage.AsObject;
  static toObject(includeInstance: boolean, msg: LandedPriceCatalogRequestMessage): LandedPriceCatalogRequestMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LandedPriceCatalogRequestMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LandedPriceCatalogRequestMessage;
  static deserializeBinaryFromReader(message: LandedPriceCatalogRequestMessage, reader: jspb.BinaryReader): LandedPriceCatalogRequestMessage;
}

export namespace LandedPriceCatalogRequestMessage {
  export type AsObject = {
    catalogslug: string,
    factor: number,
  }
}

export class CatalogResponseMessage extends jspb.Message {
  getUrlcurrent(): string;
  setUrlcurrent(value: string): void;

  getUrlall(): string;
  setUrlall(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CatalogResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CatalogResponseMessage): CatalogResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CatalogResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CatalogResponseMessage;
  static deserializeBinaryFromReader(message: CatalogResponseMessage, reader: jspb.BinaryReader): CatalogResponseMessage;
}

export namespace CatalogResponseMessage {
  export type AsObject = {
    urlcurrent: string,
    urlall: string,
  }
}

