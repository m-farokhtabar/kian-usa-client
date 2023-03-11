// package: 
// file: category.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class CategoryResponseMessage extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getSlug(): string;
  setSlug(value: string): void;

  getShortdescription(): string;
  setShortdescription(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  clearParametersList(): void;
  getParametersList(): Array<CategoryParameterResponseMessage>;
  setParametersList(value: Array<CategoryParameterResponseMessage>): void;
  addParameters(value?: CategoryParameterResponseMessage, index?: number): CategoryParameterResponseMessage;

  clearFeaturesList(): void;
  getFeaturesList(): Array<CategoryParameterResponseMessage>;
  setFeaturesList(value: Array<CategoryParameterResponseMessage>): void;
  addFeatures(value?: CategoryParameterResponseMessage, index?: number): CategoryParameterResponseMessage;

  clearChildrenList(): void;
  getChildrenList(): Array<ChildrenCategoryResponseMessage>;
  setChildrenList(value: Array<ChildrenCategoryResponseMessage>): void;
  addChildren(value?: ChildrenCategoryResponseMessage, index?: number): ChildrenCategoryResponseMessage;

  getOrder(): number;
  setOrder(value: number): void;

  clearImagesurlList(): void;
  getImagesurlList(): Array<string>;
  setImagesurlList(value: Array<string>): void;
  addImagesurl(value: string, index?: number): string;

  clearTagsList(): void;
  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): void;
  addTags(value: string, index?: number): string;

  clearSecuritiesList(): void;
  getSecuritiesList(): Array<string>;
  setSecuritiesList(value: Array<string>): void;
  addSecurities(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CategoryResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CategoryResponseMessage): CategoryResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CategoryResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CategoryResponseMessage;
  static deserializeBinaryFromReader(message: CategoryResponseMessage, reader: jspb.BinaryReader): CategoryResponseMessage;
}

export namespace CategoryResponseMessage {
  export type AsObject = {
    id: string,
    name: string,
    slug: string,
    shortdescription: string,
    description: string,
    parametersList: Array<CategoryParameterResponseMessage.AsObject>,
    featuresList: Array<CategoryParameterResponseMessage.AsObject>,
    childrenList: Array<ChildrenCategoryResponseMessage.AsObject>,
    order: number,
    imagesurlList: Array<string>,
    tagsList: Array<string>,
    securitiesList: Array<string>,
  }
}

export class CategoriesResponseMessage extends jspb.Message {
  clearCategoriesList(): void;
  getCategoriesList(): Array<CategoryResponseMessage>;
  setCategoriesList(value: Array<CategoryResponseMessage>): void;
  addCategories(value?: CategoryResponseMessage, index?: number): CategoryResponseMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CategoriesResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CategoriesResponseMessage): CategoriesResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CategoriesResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CategoriesResponseMessage;
  static deserializeBinaryFromReader(message: CategoriesResponseMessage, reader: jspb.BinaryReader): CategoriesResponseMessage;
}

export namespace CategoriesResponseMessage {
  export type AsObject = {
    categoriesList: Array<CategoryResponseMessage.AsObject>,
  }
}

export class CategoryShortDataResponseMessage extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getSlug(): string;
  setSlug(value: string): void;

  getShortdescription(): string;
  setShortdescription(value: string): void;

  getOrder(): number;
  setOrder(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CategoryShortDataResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CategoryShortDataResponseMessage): CategoryShortDataResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CategoryShortDataResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CategoryShortDataResponseMessage;
  static deserializeBinaryFromReader(message: CategoryShortDataResponseMessage, reader: jspb.BinaryReader): CategoryShortDataResponseMessage;
}

export namespace CategoryShortDataResponseMessage {
  export type AsObject = {
    id: string,
    name: string,
    slug: string,
    shortdescription: string,
    order: number,
  }
}

export class CategoriesShortDataResponseMessage extends jspb.Message {
  clearCategoriesList(): void;
  getCategoriesList(): Array<CategoryShortDataResponseMessage>;
  setCategoriesList(value: Array<CategoryShortDataResponseMessage>): void;
  addCategories(value?: CategoryShortDataResponseMessage, index?: number): CategoryShortDataResponseMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CategoriesShortDataResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CategoriesShortDataResponseMessage): CategoriesShortDataResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CategoriesShortDataResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CategoriesShortDataResponseMessage;
  static deserializeBinaryFromReader(message: CategoriesShortDataResponseMessage, reader: jspb.BinaryReader): CategoriesShortDataResponseMessage;
}

export namespace CategoriesShortDataResponseMessage {
  export type AsObject = {
    categoriesList: Array<CategoryShortDataResponseMessage.AsObject>,
  }
}

export class ChildrenCategoryResponseMessage extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getSlug(): string;
  setSlug(value: string): void;

  getOrder(): number;
  setOrder(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChildrenCategoryResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ChildrenCategoryResponseMessage): ChildrenCategoryResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChildrenCategoryResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChildrenCategoryResponseMessage;
  static deserializeBinaryFromReader(message: ChildrenCategoryResponseMessage, reader: jspb.BinaryReader): ChildrenCategoryResponseMessage;
}

export namespace ChildrenCategoryResponseMessage {
  export type AsObject = {
    id: string,
    slug: string,
    order: number,
  }
}

export class CategoryParameterResponseMessage extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CategoryParameterResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CategoryParameterResponseMessage): CategoryParameterResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CategoryParameterResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CategoryParameterResponseMessage;
  static deserializeBinaryFromReader(message: CategoryParameterResponseMessage, reader: jspb.BinaryReader): CategoryParameterResponseMessage;
}

export namespace CategoryParameterResponseMessage {
  export type AsObject = {
    name: string,
    value: string,
  }
}

export class CategoryByIdRequestMessage extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CategoryByIdRequestMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CategoryByIdRequestMessage): CategoryByIdRequestMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CategoryByIdRequestMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CategoryByIdRequestMessage;
  static deserializeBinaryFromReader(message: CategoryByIdRequestMessage, reader: jspb.BinaryReader): CategoryByIdRequestMessage;
}

export namespace CategoryByIdRequestMessage {
  export type AsObject = {
    id: string,
  }
}

export class CategoryBySlugRequestMessage extends jspb.Message {
  getSlug(): string;
  setSlug(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CategoryBySlugRequestMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CategoryBySlugRequestMessage): CategoryBySlugRequestMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CategoryBySlugRequestMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CategoryBySlugRequestMessage;
  static deserializeBinaryFromReader(message: CategoryBySlugRequestMessage, reader: jspb.BinaryReader): CategoryBySlugRequestMessage;
}

export namespace CategoryBySlugRequestMessage {
  export type AsObject = {
    slug: string,
  }
}

export class CategoryByTagsRequestMessage extends jspb.Message {
  clearTagsList(): void;
  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): void;
  addTags(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CategoryByTagsRequestMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CategoryByTagsRequestMessage): CategoryByTagsRequestMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CategoryByTagsRequestMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CategoryByTagsRequestMessage;
  static deserializeBinaryFromReader(message: CategoryByTagsRequestMessage, reader: jspb.BinaryReader): CategoryByTagsRequestMessage;
}

export namespace CategoryByTagsRequestMessage {
  export type AsObject = {
    tagsList: Array<string>,
  }
}

