// package: 
// file: account.proto

import * as jspb from "google-protobuf";

export class LoginRequestMessage extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginRequestMessage.AsObject;
  static toObject(includeInstance: boolean, msg: LoginRequestMessage): LoginRequestMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LoginRequestMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginRequestMessage;
  static deserializeBinaryFromReader(message: LoginRequestMessage, reader: jspb.BinaryReader): LoginRequestMessage;
}

export namespace LoginRequestMessage {
  export type AsObject = {
    username: string,
    password: string,
  }
}

export class LoginResponseMessage extends jspb.Message {
  getToken(): string;
  setToken(value: string): void;

  clearPagesList(): void;
  getPagesList(): Array<string>;
  setPagesList(value: Array<string>): void;
  addPages(value: string, index?: number): string;

  clearButtonsList(): void;
  getButtonsList(): Array<string>;
  setButtonsList(value: Array<string>): void;
  addButtons(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: LoginResponseMessage): LoginResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LoginResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginResponseMessage;
  static deserializeBinaryFromReader(message: LoginResponseMessage, reader: jspb.BinaryReader): LoginResponseMessage;
}

export namespace LoginResponseMessage {
  export type AsObject = {
    token: string,
    pagesList: Array<string>,
    buttonsList: Array<string>,
  }
}

export class CustomersOfRepRequestMessage extends jspb.Message {
  getRepusername(): string;
  setRepusername(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CustomersOfRepRequestMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CustomersOfRepRequestMessage): CustomersOfRepRequestMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CustomersOfRepRequestMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CustomersOfRepRequestMessage;
  static deserializeBinaryFromReader(message: CustomersOfRepRequestMessage, reader: jspb.BinaryReader): CustomersOfRepRequestMessage;
}

export namespace CustomersOfRepRequestMessage {
  export type AsObject = {
    repusername: string,
  }
}

export class CustomerOfRepResponseMessage extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getFamily(): string;
  setFamily(value: string): void;

  getUsername(): string;
  setUsername(value: string): void;

  getStorename(): string;
  setStorename(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CustomerOfRepResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CustomerOfRepResponseMessage): CustomerOfRepResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CustomerOfRepResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CustomerOfRepResponseMessage;
  static deserializeBinaryFromReader(message: CustomerOfRepResponseMessage, reader: jspb.BinaryReader): CustomerOfRepResponseMessage;
}

export namespace CustomerOfRepResponseMessage {
  export type AsObject = {
    id: string,
    name: string,
    family: string,
    username: string,
    storename: string,
  }
}

export class CustomersOfRepResponseMessage extends jspb.Message {
  clearCustomersList(): void;
  getCustomersList(): Array<CustomerOfRepResponseMessage>;
  setCustomersList(value: Array<CustomerOfRepResponseMessage>): void;
  addCustomers(value?: CustomerOfRepResponseMessage, index?: number): CustomerOfRepResponseMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CustomersOfRepResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CustomersOfRepResponseMessage): CustomersOfRepResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CustomersOfRepResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CustomersOfRepResponseMessage;
  static deserializeBinaryFromReader(message: CustomersOfRepResponseMessage, reader: jspb.BinaryReader): CustomersOfRepResponseMessage;
}

export namespace CustomersOfRepResponseMessage {
  export type AsObject = {
    customersList: Array<CustomerOfRepResponseMessage.AsObject>,
  }
}

