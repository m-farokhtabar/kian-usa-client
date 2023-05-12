// package: 
// file: email.proto

import * as email_pb from "./email_pb";
import {grpc} from "@improbable-eng/grpc-web";

type EmailSrvSendCatalog = {
  readonly methodName: string;
  readonly service: typeof EmailSrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof email_pb.SendCatalogRequestMessage;
  readonly responseType: typeof email_pb.SendResponseMessage;
};

type EmailSrvSendCatalogAdvanced = {
  readonly methodName: string;
  readonly service: typeof EmailSrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof email_pb.SendAdvancedCatalogRequest;
  readonly responseType: typeof email_pb.SendResponseMessage;
};

type EmailSrvSendCatalogWithLandedPrice = {
  readonly methodName: string;
  readonly service: typeof EmailSrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof email_pb.SendCatalogWithLandedPriceRequestMessage;
  readonly responseType: typeof email_pb.SendResponseMessage;
};

type EmailSrvSendContactUs = {
  readonly methodName: string;
  readonly service: typeof EmailSrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof email_pb.SendContactUsRequestMessage;
  readonly responseType: typeof email_pb.SendResponseMessage;
};

export class EmailSrv {
  static readonly serviceName: string;
  static readonly SendCatalog: EmailSrvSendCatalog;
  static readonly SendCatalogAdvanced: EmailSrvSendCatalogAdvanced;
  static readonly SendCatalogWithLandedPrice: EmailSrvSendCatalogWithLandedPrice;
  static readonly SendContactUs: EmailSrvSendContactUs;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class EmailSrvClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  sendCatalog(
    requestMessage: email_pb.SendCatalogRequestMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: email_pb.SendResponseMessage|null) => void
  ): UnaryResponse;
  sendCatalog(
    requestMessage: email_pb.SendCatalogRequestMessage,
    callback: (error: ServiceError|null, responseMessage: email_pb.SendResponseMessage|null) => void
  ): UnaryResponse;
  sendCatalogAdvanced(
    requestMessage: email_pb.SendAdvancedCatalogRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: email_pb.SendResponseMessage|null) => void
  ): UnaryResponse;
  sendCatalogAdvanced(
    requestMessage: email_pb.SendAdvancedCatalogRequest,
    callback: (error: ServiceError|null, responseMessage: email_pb.SendResponseMessage|null) => void
  ): UnaryResponse;
  sendCatalogWithLandedPrice(
    requestMessage: email_pb.SendCatalogWithLandedPriceRequestMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: email_pb.SendResponseMessage|null) => void
  ): UnaryResponse;
  sendCatalogWithLandedPrice(
    requestMessage: email_pb.SendCatalogWithLandedPriceRequestMessage,
    callback: (error: ServiceError|null, responseMessage: email_pb.SendResponseMessage|null) => void
  ): UnaryResponse;
  sendContactUs(
    requestMessage: email_pb.SendContactUsRequestMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: email_pb.SendResponseMessage|null) => void
  ): UnaryResponse;
  sendContactUs(
    requestMessage: email_pb.SendContactUsRequestMessage,
    callback: (error: ServiceError|null, responseMessage: email_pb.SendResponseMessage|null) => void
  ): UnaryResponse;
}

