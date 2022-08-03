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
  }
}

