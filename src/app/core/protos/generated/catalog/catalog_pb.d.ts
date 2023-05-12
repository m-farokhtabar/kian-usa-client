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

export class DownloadCatalogRequest extends jspb.Message {
  getCategoryslug(): string;
  setCategoryslug(value: string): void;

  getPrices(): string;
  setPrices(value: string): void;

  getFactor(): number;
  setFactor(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DownloadCatalogRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DownloadCatalogRequest): DownloadCatalogRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DownloadCatalogRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DownloadCatalogRequest;
  static deserializeBinaryFromReader(message: DownloadCatalogRequest, reader: jspb.BinaryReader): DownloadCatalogRequest;
}

export namespace DownloadCatalogRequest {
  export type AsObject = {
    categoryslug: string,
    prices: string,
    factor: number,
  }
}

export class DownloadAdvanceCatalogRequest extends jspb.Message {
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

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DownloadAdvanceCatalogRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DownloadAdvanceCatalogRequest): DownloadAdvanceCatalogRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DownloadAdvanceCatalogRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DownloadAdvanceCatalogRequest;
  static deserializeBinaryFromReader(message: DownloadAdvanceCatalogRequest, reader: jspb.BinaryReader): DownloadAdvanceCatalogRequest;
}

export namespace DownloadAdvanceCatalogRequest {
  export type AsObject = {
    categoriesslugList: Array<string>,
    pricesList: Array<number>,
    factoriesList: Array<string>,
    landedprice: number,
    justavailable: boolean,
  }
}

export class DownloadCatalogResponse extends jspb.Message {
  getUrl(): string;
  setUrl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DownloadCatalogResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DownloadCatalogResponse): DownloadCatalogResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DownloadCatalogResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DownloadCatalogResponse;
  static deserializeBinaryFromReader(message: DownloadCatalogResponse, reader: jspb.BinaryReader): DownloadCatalogResponse;
}

export namespace DownloadCatalogResponse {
  export type AsObject = {
    url: string,
  }
}

