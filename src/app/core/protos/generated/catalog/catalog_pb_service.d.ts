// package: 
// file: catalog.proto

import * as catalog_pb from "./catalog_pb";
import {grpc} from "@improbable-eng/grpc-web";

type CatalogSrvGetLandedPriceCatalogUrl = {
  readonly methodName: string;
  readonly service: typeof CatalogSrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof catalog_pb.LandedPriceCatalogRequestMessage;
  readonly responseType: typeof catalog_pb.CatalogResponseMessage;
};

type CatalogSrvDownloadCatalog = {
  readonly methodName: string;
  readonly service: typeof CatalogSrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof catalog_pb.DownloadCatalogRequest;
  readonly responseType: typeof catalog_pb.DownloadCatalogResponse;
};

type CatalogSrvDownloadAdvanceCatalog = {
  readonly methodName: string;
  readonly service: typeof CatalogSrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof catalog_pb.DownloadAdvanceCatalogRequest;
  readonly responseType: typeof catalog_pb.DownloadCatalogResponse;
};

export class CatalogSrv {
  static readonly serviceName: string;
  static readonly GetLandedPriceCatalogUrl: CatalogSrvGetLandedPriceCatalogUrl;
  static readonly DownloadCatalog: CatalogSrvDownloadCatalog;
  static readonly DownloadAdvanceCatalog: CatalogSrvDownloadAdvanceCatalog;
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

export class CatalogSrvClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getLandedPriceCatalogUrl(
    requestMessage: catalog_pb.LandedPriceCatalogRequestMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: catalog_pb.CatalogResponseMessage|null) => void
  ): UnaryResponse;
  getLandedPriceCatalogUrl(
    requestMessage: catalog_pb.LandedPriceCatalogRequestMessage,
    callback: (error: ServiceError|null, responseMessage: catalog_pb.CatalogResponseMessage|null) => void
  ): UnaryResponse;
  downloadCatalog(
    requestMessage: catalog_pb.DownloadCatalogRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: catalog_pb.DownloadCatalogResponse|null) => void
  ): UnaryResponse;
  downloadCatalog(
    requestMessage: catalog_pb.DownloadCatalogRequest,
    callback: (error: ServiceError|null, responseMessage: catalog_pb.DownloadCatalogResponse|null) => void
  ): UnaryResponse;
  downloadAdvanceCatalog(
    requestMessage: catalog_pb.DownloadAdvanceCatalogRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: catalog_pb.DownloadCatalogResponse|null) => void
  ): UnaryResponse;
  downloadAdvanceCatalog(
    requestMessage: catalog_pb.DownloadAdvanceCatalogRequest,
    callback: (error: ServiceError|null, responseMessage: catalog_pb.DownloadCatalogResponse|null) => void
  ): UnaryResponse;
}

