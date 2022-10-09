// package: 
// file: group.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class GroupResponseMessage extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getIsvisible(): boolean;
  setIsvisible(value: boolean): void;

  getOrder(): number;
  setOrder(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GroupResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: GroupResponseMessage): GroupResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GroupResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GroupResponseMessage;
  static deserializeBinaryFromReader(message: GroupResponseMessage, reader: jspb.BinaryReader): GroupResponseMessage;
}

export namespace GroupResponseMessage {
  export type AsObject = {
    id: string,
    name: string,
    isvisible: boolean,
    order: number,
  }
}

export class GroupsResponseMessage extends jspb.Message {
  clearGroupsList(): void;
  getGroupsList(): Array<GroupResponseMessage>;
  setGroupsList(value: Array<GroupResponseMessage>): void;
  addGroups(value?: GroupResponseMessage, index?: number): GroupResponseMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GroupsResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: GroupsResponseMessage): GroupsResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GroupsResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GroupsResponseMessage;
  static deserializeBinaryFromReader(message: GroupsResponseMessage, reader: jspb.BinaryReader): GroupsResponseMessage;
}

export namespace GroupsResponseMessage {
  export type AsObject = {
    groupsList: Array<GroupResponseMessage.AsObject>,
  }
}

