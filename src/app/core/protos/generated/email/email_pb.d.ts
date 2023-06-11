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

  getWhichprice(): string;
  setWhichprice(value: string): void;

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
    whichprice: string,
  }
}

export class SendCatalogWithLandedPriceRequestMessage extends jspb.Message {
  getCustomerfullname(): string;
  setCustomerfullname(value: string): void;

  getCustomeremail(): string;
  setCustomeremail(value: string): void;

  getCategoryslug(): string;
  setCategoryslug(value: string): void;

  getFactor(): number;
  setFactor(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendCatalogWithLandedPriceRequestMessage.AsObject;
  static toObject(includeInstance: boolean, msg: SendCatalogWithLandedPriceRequestMessage): SendCatalogWithLandedPriceRequestMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendCatalogWithLandedPriceRequestMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendCatalogWithLandedPriceRequestMessage;
  static deserializeBinaryFromReader(message: SendCatalogWithLandedPriceRequestMessage, reader: jspb.BinaryReader): SendCatalogWithLandedPriceRequestMessage;
}

export namespace SendCatalogWithLandedPriceRequestMessage {
  export type AsObject = {
    customerfullname: string,
    customeremail: string,
    categoryslug: string,
    factor: number,
  }
}

export class SendResponseMessage extends jspb.Message {
  getPutinemailqueue(): boolean;
  setPutinemailqueue(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: SendResponseMessage): SendResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendResponseMessage;
  static deserializeBinaryFromReader(message: SendResponseMessage, reader: jspb.BinaryReader): SendResponseMessage;
}

export namespace SendResponseMessage {
  export type AsObject = {
    putinemailqueue: boolean,
  }
}

export class SendContactUsRequestMessage extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getFamily(): string;
  setFamily(value: string): void;

  getPhone(): string;
  setPhone(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getComment(): string;
  setComment(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendContactUsRequestMessage.AsObject;
  static toObject(includeInstance: boolean, msg: SendContactUsRequestMessage): SendContactUsRequestMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendContactUsRequestMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendContactUsRequestMessage;
  static deserializeBinaryFromReader(message: SendContactUsRequestMessage, reader: jspb.BinaryReader): SendContactUsRequestMessage;
}

export namespace SendContactUsRequestMessage {
  export type AsObject = {
    name: string,
    family: string,
    phone: string,
    email: string,
    comment: string,
  }
}

export class SendAdvancedCatalogRequest extends jspb.Message {
  clearCategoriesslugList(): void;
  getCategoriesslugList(): Array<string>;
  setCategoriesslugList(value: Array<string>): void;
  addCategoriesslug(value: string, index?: number): string;

  clearPricesList(): void;
  getPricesList(): Array<number>;
  setPricesList(value: Array<number>): void;
  addPrices(value: number, index?: number): number;

  clearFactoriesList(): void;
  getFactoriesList(): Array<string>;
  setFactoriesList(value: Array<string>): void;
  addFactories(value: string, index?: number): string;

  getLandedprice(): number;
  setLandedprice(value: number): void;

  getJustavailable(): boolean;
  setJustavailable(value: boolean): void;

  getCustomerfullname(): string;
  setCustomerfullname(value: string): void;

  getCustombodytext(): string;
  setCustombodytext(value: string): void;

  getCustomeremail(): string;
  setCustomeremail(value: string): void;

  getIncludeextrapictures(): boolean;
  setIncludeextrapictures(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendAdvancedCatalogRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SendAdvancedCatalogRequest): SendAdvancedCatalogRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendAdvancedCatalogRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendAdvancedCatalogRequest;
  static deserializeBinaryFromReader(message: SendAdvancedCatalogRequest, reader: jspb.BinaryReader): SendAdvancedCatalogRequest;
}

export namespace SendAdvancedCatalogRequest {
  export type AsObject = {
    categoriesslugList: Array<string>,
    pricesList: Array<number>,
    factoriesList: Array<string>,
    landedprice: number,
    justavailable: boolean,
    customerfullname: string,
    custombodytext: string,
    customeremail: string,
    includeextrapictures: boolean,
  }
}

