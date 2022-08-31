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

