// package: 
// file: order.proto

import * as jspb from "google-protobuf";

export class ProductOrder extends jspb.Message {
  getProductid(): string;
  setProductid(value: string): void;

  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductOrder.AsObject;
  static toObject(includeInstance: boolean, msg: ProductOrder): ProductOrder.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProductOrder, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductOrder;
  static deserializeBinaryFromReader(message: ProductOrder, reader: jspb.BinaryReader): ProductOrder;
}

export namespace ProductOrder {
  export type AsObject = {
    productid: string,
    count: number,
  }
}

export class OrderRequestMessage extends jspb.Message {
  getCustomerusername(): string;
  setCustomerusername(value: string): void;

  getPricetype(): PriceTypeMap[keyof PriceTypeMap];
  setPricetype(value: PriceTypeMap[keyof PriceTypeMap]): void;

  getCost(): number;
  setCost(value: number): void;

  getDelivery(): DeliveryTypeMap[keyof DeliveryTypeMap];
  setDelivery(value: DeliveryTypeMap[keyof DeliveryTypeMap]): void;

  getTariff(): TariffTypeMap[keyof TariffTypeMap];
  setTariff(value: TariffTypeMap[keyof TariffTypeMap]): void;

  clearOrdersList(): void;
  getOrdersList(): Array<ProductOrder>;
  setOrdersList(value: Array<ProductOrder>): void;
  addOrders(value?: ProductOrder, index?: number): ProductOrder;

  getDescription(): string;
  setDescription(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OrderRequestMessage.AsObject;
  static toObject(includeInstance: boolean, msg: OrderRequestMessage): OrderRequestMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: OrderRequestMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OrderRequestMessage;
  static deserializeBinaryFromReader(message: OrderRequestMessage, reader: jspb.BinaryReader): OrderRequestMessage;
}

export namespace OrderRequestMessage {
  export type AsObject = {
    customerusername: string,
    pricetype: PriceTypeMap[keyof PriceTypeMap],
    cost: number,
    delivery: DeliveryTypeMap[keyof DeliveryTypeMap],
    tariff: TariffTypeMap[keyof TariffTypeMap],
    ordersList: Array<ProductOrder.AsObject>,
    description: string,
  }
}

export class OrderResponseMessage extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  getIserror(): boolean;
  setIserror(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OrderResponseMessage.AsObject;
  static toObject(includeInstance: boolean, msg: OrderResponseMessage): OrderResponseMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: OrderResponseMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OrderResponseMessage;
  static deserializeBinaryFromReader(message: OrderResponseMessage, reader: jspb.BinaryReader): OrderResponseMessage;
}

export namespace OrderResponseMessage {
  export type AsObject = {
    message: string,
    iserror: boolean,
  }
}

export interface PriceTypeMap {
  FOB: 0;
  SAC: 1;
  LANDEDPRICE: 2;
}

export const PriceType: PriceTypeMap;

export interface DeliveryTypeMap {
  CUSTOMERFORWARDER: 0;
  WILLCALL: 1;
  KIANUSA: 2;
}

export const DeliveryType: DeliveryTypeMap;

export interface TariffTypeMap {
  IORKIAN: 0;
  IORCUSTOMER: 1;
}

export const TariffType: TariffTypeMap;

