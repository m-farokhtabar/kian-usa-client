// package: 
// file: filter.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class FilterResponseMessage extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getOrder(): number;
  setOrder(value: number): void;

  clearTagsList(): void;
  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): void;
  addTags(value: string, index?: number): string;

  clearGroupsList(): void;
  getGroupsList(): Array<string>;
  setGroupsList(value: Array<string>): void;
  addGroups(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FilterResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: FilterResponseMessage): FilterResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FilterResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FilterResponseMessage;
  static deserializeBinaryFromReader(message: FilterResponseMessage, reader: jspb.BinaryReader): FilterResponseMessage;
}

export namespace FilterResponseMessage {
  export type AsObject = {
    id: string,
    name: string,
    order: number,
    tagsList: Array<string>,
    groupsList: Array<string>,
  }
}

export class FiltersResponseMessage extends jspb.Message {
  clearFiltersList(): void;
  getFiltersList(): Array<FilterResponseMessage>;
  setFiltersList(value: Array<FilterResponseMessage>): void;
  addFilters(value?: FilterResponseMessage, index?: number): FilterResponseMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FiltersResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: FiltersResponseMessage): FiltersResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FiltersResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FiltersResponseMessage;
  static deserializeBinaryFromReader(message: FiltersResponseMessage, reader: jspb.BinaryReader): FiltersResponseMessage;
}

export namespace FiltersResponseMessage {
  export type AsObject = {
    filtersList: Array<FilterResponseMessage.AsObject>,
  }
}

