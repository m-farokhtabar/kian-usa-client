// package: 
// file: product.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

export class ProductResponseMessage extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getSlug(): string;
  setSlug(value: string): void;

  hasInventory(): boolean;
  clearInventory(): void;
  getInventory(): google_protobuf_wrappers_pb.DoubleValue | undefined;
  setInventory(value?: google_protobuf_wrappers_pb.DoubleValue): void;

  getShortdescription(): string;
  setShortdescription(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  clearPricesList(): void;
  getPricesList(): Array<ProductPriceResponseMessage>;
  setPricesList(value: Array<ProductPriceResponseMessage>): void;
  addPrices(value?: ProductPriceResponseMessage, index?: number): ProductPriceResponseMessage;

  hasCube(): boolean;
  clearCube(): void;
  getCube(): google_protobuf_wrappers_pb.DoubleValue | undefined;
  setCube(value?: google_protobuf_wrappers_pb.DoubleValue): void;

  hasW(): boolean;
  clearW(): void;
  getW(): google_protobuf_wrappers_pb.DoubleValue | undefined;
  setW(value?: google_protobuf_wrappers_pb.DoubleValue): void;

  hasD(): boolean;
  clearD(): void;
  getD(): google_protobuf_wrappers_pb.DoubleValue | undefined;
  setD(value?: google_protobuf_wrappers_pb.DoubleValue): void;

  hasH(): boolean;
  clearH(): void;
  getH(): google_protobuf_wrappers_pb.DoubleValue | undefined;
  setH(value?: google_protobuf_wrappers_pb.DoubleValue): void;

  hasWeight(): boolean;
  clearWeight(): void;
  getWeight(): google_protobuf_wrappers_pb.DoubleValue | undefined;
  setWeight(value?: google_protobuf_wrappers_pb.DoubleValue): void;

  hasBoxw(): boolean;
  clearBoxw(): void;
  getBoxw(): google_protobuf_wrappers_pb.DoubleValue | undefined;
  setBoxw(value?: google_protobuf_wrappers_pb.DoubleValue): void;

  hasBoxd(): boolean;
  clearBoxd(): void;
  getBoxd(): google_protobuf_wrappers_pb.DoubleValue | undefined;
  setBoxd(value?: google_protobuf_wrappers_pb.DoubleValue): void;

  hasBoxh(): boolean;
  clearBoxh(): void;
  getBoxh(): google_protobuf_wrappers_pb.DoubleValue | undefined;
  setBoxh(value?: google_protobuf_wrappers_pb.DoubleValue): void;

  clearSecuritiesList(): void;
  getSecuritiesList(): Array<string>;
  setSecuritiesList(value: Array<string>): void;
  addSecurities(value: string, index?: number): string;

  getWhqty(): string;
  setWhqty(value: string): void;

  getOrder(): number;
  setOrder(value: number): void;

  clearImagesurlsList(): void;
  getImagesurlsList(): Array<string>;
  setImagesurlsList(value: Array<string>): void;
  addImagesurls(value: string, index?: number): string;

  getIsgroup(): boolean;
  setIsgroup(value: boolean): void;

  clearCategoryidsList(): void;
  getCategoryidsList(): Array<string>;
  setCategoryidsList(value: Array<string>): void;
  addCategoryids(value: string, index?: number): string;

  clearTagsList(): void;
  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): void;
  addTags(value: string, index?: number): string;

  clearGroupsList(): void;
  getGroupsList(): Array<string>;
  setGroupsList(value: Array<string>): void;
  addGroups(value: string, index?: number): string;

  clearFactoriesList(): void;
  getFactoriesList(): Array<string>;
  setFactoriesList(value: Array<string>): void;
  addFactories(value: string, index?: number): string;

  getPiecescount(): number;
  setPiecescount(value: number): void;

  clearComplexitempiecesList(): void;
  getComplexitempiecesList(): Array<string>;
  setComplexitempiecesList(value: Array<string>): void;
  addComplexitempieces(value: string, index?: number): string;

  getComplexitempriority(): number;
  setComplexitempriority(value: number): void;

  getProductdescription(): string;
  setProductdescription(value: string): void;

  clearFeaturesList(): void;
  getFeaturesList(): Array<KeyValue>;
  setFeaturesList(value: Array<KeyValue>): void;
  addFeatures(value?: KeyValue, index?: number): KeyValue;

  clearPricepermissionsList(): void;
  getPricepermissionsList(): Array<KeyValue>;
  setPricepermissionsList(value: Array<KeyValue>): void;
  addPricepermissions(value?: KeyValue, index?: number): KeyValue;

  getIssample(): string;
  setIssample(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ProductResponseMessage): ProductResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProductResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductResponseMessage;
  static deserializeBinaryFromReader(message: ProductResponseMessage, reader: jspb.BinaryReader): ProductResponseMessage;
}

export namespace ProductResponseMessage {
  export type AsObject = {
    id: string,
    name: string,
    slug: string,
    inventory?: google_protobuf_wrappers_pb.DoubleValue.AsObject,
    shortdescription: string,
    description: string,
    pricesList: Array<ProductPriceResponseMessage.AsObject>,
    cube?: google_protobuf_wrappers_pb.DoubleValue.AsObject,
    w?: google_protobuf_wrappers_pb.DoubleValue.AsObject,
    d?: google_protobuf_wrappers_pb.DoubleValue.AsObject,
    h?: google_protobuf_wrappers_pb.DoubleValue.AsObject,
    weight?: google_protobuf_wrappers_pb.DoubleValue.AsObject,
    boxw?: google_protobuf_wrappers_pb.DoubleValue.AsObject,
    boxd?: google_protobuf_wrappers_pb.DoubleValue.AsObject,
    boxh?: google_protobuf_wrappers_pb.DoubleValue.AsObject,
    securitiesList: Array<string>,
    whqty: string,
    order: number,
    imagesurlsList: Array<string>,
    isgroup: boolean,
    categoryidsList: Array<string>,
    tagsList: Array<string>,
    groupsList: Array<string>,
    factoriesList: Array<string>,
    piecescount: number,
    complexitempiecesList: Array<string>,
    complexitempriority: number,
    productdescription: string,
    featuresList: Array<KeyValue.AsObject>,
    pricepermissionsList: Array<KeyValue.AsObject>,
    issample: string,
  }
}

export class ProductPriceResponseMessage extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  hasValue(): boolean;
  clearValue(): void;
  getValue(): google_protobuf_wrappers_pb.DoubleValue | undefined;
  setValue(value?: google_protobuf_wrappers_pb.DoubleValue): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductPriceResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ProductPriceResponseMessage): ProductPriceResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProductPriceResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductPriceResponseMessage;
  static deserializeBinaryFromReader(message: ProductPriceResponseMessage, reader: jspb.BinaryReader): ProductPriceResponseMessage;
}

export namespace ProductPriceResponseMessage {
  export type AsObject = {
    name: string,
    value?: google_protobuf_wrappers_pb.DoubleValue.AsObject,
  }
}

export class ProductsResponseMessage extends jspb.Message {
  clearProductsList(): void;
  getProductsList(): Array<ProductResponseMessage>;
  setProductsList(value: Array<ProductResponseMessage>): void;
  addProducts(value?: ProductResponseMessage, index?: number): ProductResponseMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductsResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ProductsResponseMessage): ProductsResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProductsResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductsResponseMessage;
  static deserializeBinaryFromReader(message: ProductsResponseMessage, reader: jspb.BinaryReader): ProductsResponseMessage;
}

export namespace ProductsResponseMessage {
  export type AsObject = {
    productsList: Array<ProductResponseMessage.AsObject>,
  }
}

export class ProductsWithTotalItemsResponseMessage extends jspb.Message {
  clearProductsList(): void;
  getProductsList(): Array<ProductResponseMessage>;
  setProductsList(value: Array<ProductResponseMessage>): void;
  addProducts(value?: ProductResponseMessage, index?: number): ProductResponseMessage;

  getTotalitems(): number;
  setTotalitems(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductsWithTotalItemsResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ProductsWithTotalItemsResponseMessage): ProductsWithTotalItemsResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProductsWithTotalItemsResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductsWithTotalItemsResponseMessage;
  static deserializeBinaryFromReader(message: ProductsWithTotalItemsResponseMessage, reader: jspb.BinaryReader): ProductsWithTotalItemsResponseMessage;
}

export namespace ProductsWithTotalItemsResponseMessage {
  export type AsObject = {
    productsList: Array<ProductResponseMessage.AsObject>,
    totalitems: number,
  }
}

export class ProductByIdRequestMessage extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductByIdRequestMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ProductByIdRequestMessage): ProductByIdRequestMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProductByIdRequestMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductByIdRequestMessage;
  static deserializeBinaryFromReader(message: ProductByIdRequestMessage, reader: jspb.BinaryReader): ProductByIdRequestMessage;
}

export namespace ProductByIdRequestMessage {
  export type AsObject = {
    id: string,
  }
}

export class ProductBySlugRequestMessage extends jspb.Message {
  getSlug(): string;
  setSlug(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductBySlugRequestMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ProductBySlugRequestMessage): ProductBySlugRequestMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProductBySlugRequestMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductBySlugRequestMessage;
  static deserializeBinaryFromReader(message: ProductBySlugRequestMessage, reader: jspb.BinaryReader): ProductBySlugRequestMessage;
}

export namespace ProductBySlugRequestMessage {
  export type AsObject = {
    slug: string,
  }
}

export class ProductsByCategoryIdRequestMessage extends jspb.Message {
  getCategoryid(): string;
  setCategoryid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductsByCategoryIdRequestMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ProductsByCategoryIdRequestMessage): ProductsByCategoryIdRequestMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProductsByCategoryIdRequestMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductsByCategoryIdRequestMessage;
  static deserializeBinaryFromReader(message: ProductsByCategoryIdRequestMessage, reader: jspb.BinaryReader): ProductsByCategoryIdRequestMessage;
}

export namespace ProductsByCategoryIdRequestMessage {
  export type AsObject = {
    categoryid: string,
  }
}

export class ProductsByCategoryIdsRequestMessage extends jspb.Message {
  clearCategoryidsList(): void;
  getCategoryidsList(): Array<string>;
  setCategoryidsList(value: Array<string>): void;
  addCategoryids(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductsByCategoryIdsRequestMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ProductsByCategoryIdsRequestMessage): ProductsByCategoryIdsRequestMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProductsByCategoryIdsRequestMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductsByCategoryIdsRequestMessage;
  static deserializeBinaryFromReader(message: ProductsByCategoryIdsRequestMessage, reader: jspb.BinaryReader): ProductsByCategoryIdsRequestMessage;
}

export namespace ProductsByCategoryIdsRequestMessage {
  export type AsObject = {
    categoryidsList: Array<string>,
  }
}

export class ProductsByCategorySlugRequestMessage extends jspb.Message {
  getCategoryslug(): string;
  setCategoryslug(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductsByCategorySlugRequestMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ProductsByCategorySlugRequestMessage): ProductsByCategorySlugRequestMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProductsByCategorySlugRequestMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductsByCategorySlugRequestMessage;
  static deserializeBinaryFromReader(message: ProductsByCategorySlugRequestMessage, reader: jspb.BinaryReader): ProductsByCategorySlugRequestMessage;
}

export namespace ProductsByCategorySlugRequestMessage {
  export type AsObject = {
    categoryslug: string,
  }
}

export class ProductsByGroupsTagsWithPagingRequestMessage extends jspb.Message {
  clearGroupsList(): void;
  getGroupsList(): Array<string>;
  setGroupsList(value: Array<string>): void;
  addGroups(value: string, index?: number): string;

  clearTagsList(): void;
  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): void;
  addTags(value: string, index?: number): string;

  getPagenumber(): number;
  setPagenumber(value: number): void;

  getPagecount(): number;
  setPagecount(value: number): void;

  getIsacsorder(): boolean;
  setIsacsorder(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductsByGroupsTagsWithPagingRequestMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ProductsByGroupsTagsWithPagingRequestMessage): ProductsByGroupsTagsWithPagingRequestMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProductsByGroupsTagsWithPagingRequestMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductsByGroupsTagsWithPagingRequestMessage;
  static deserializeBinaryFromReader(message: ProductsByGroupsTagsWithPagingRequestMessage, reader: jspb.BinaryReader): ProductsByGroupsTagsWithPagingRequestMessage;
}

export namespace ProductsByGroupsTagsWithPagingRequestMessage {
  export type AsObject = {
    groupsList: Array<string>,
    tagsList: Array<string>,
    pagenumber: number,
    pagecount: number,
    isacsorder: boolean,
  }
}

export class KeyValue extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): KeyValue.AsObject;
  static toObject(includeInstance: boolean, msg: KeyValue): KeyValue.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: KeyValue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): KeyValue;
  static deserializeBinaryFromReader(message: KeyValue, reader: jspb.BinaryReader): KeyValue;
}

export namespace KeyValue {
  export type AsObject = {
    name: string,
    value: string,
  }
}

