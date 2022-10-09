// package: 
// file: product.proto

import * as product_pb from "./product_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ProductSrvGetAll = {
  readonly methodName: string;
  readonly service: typeof ProductSrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof product_pb.ProductsResponseMessage;
};

type ProductSrvGetByGroupsTagsWithPaging = {
  readonly methodName: string;
  readonly service: typeof ProductSrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof product_pb.ProductsByGroupsTagsWithPagingRequestMessage;
  readonly responseType: typeof product_pb.ProductsWithTotalItemsResponseMessage;
};

type ProductSrvGetByCategoryId = {
  readonly methodName: string;
  readonly service: typeof ProductSrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof product_pb.ProductsByCategoryIdRequestMessage;
  readonly responseType: typeof product_pb.ProductsResponseMessage;
};

type ProductSrvGetByCategoryIds = {
  readonly methodName: string;
  readonly service: typeof ProductSrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof product_pb.ProductsByCategoryIdsRequestMessage;
  readonly responseType: typeof product_pb.ProductsResponseMessage;
};

type ProductSrvGetByCategorySlug = {
  readonly methodName: string;
  readonly service: typeof ProductSrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof product_pb.ProductsByCategorySlugRequestMessage;
  readonly responseType: typeof product_pb.ProductsResponseMessage;
};

type ProductSrvGetByFirstCategory = {
  readonly methodName: string;
  readonly service: typeof ProductSrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof product_pb.ProductsResponseMessage;
};

type ProductSrvGetById = {
  readonly methodName: string;
  readonly service: typeof ProductSrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof product_pb.ProductByIdRequestMessage;
  readonly responseType: typeof product_pb.ProductResponseMessage;
};

type ProductSrvGetBySlug = {
  readonly methodName: string;
  readonly service: typeof ProductSrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof product_pb.ProductBySlugRequestMessage;
  readonly responseType: typeof product_pb.ProductResponseMessage;
};

export class ProductSrv {
  static readonly serviceName: string;
  static readonly GetAll: ProductSrvGetAll;
  static readonly GetByGroupsTagsWithPaging: ProductSrvGetByGroupsTagsWithPaging;
  static readonly GetByCategoryId: ProductSrvGetByCategoryId;
  static readonly GetByCategoryIds: ProductSrvGetByCategoryIds;
  static readonly GetByCategorySlug: ProductSrvGetByCategorySlug;
  static readonly GetByFirstCategory: ProductSrvGetByFirstCategory;
  static readonly GetById: ProductSrvGetById;
  static readonly GetBySlug: ProductSrvGetBySlug;
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

export class ProductSrvClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getAll(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: product_pb.ProductsResponseMessage|null) => void
  ): UnaryResponse;
  getAll(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: product_pb.ProductsResponseMessage|null) => void
  ): UnaryResponse;
  getByGroupsTagsWithPaging(
    requestMessage: product_pb.ProductsByGroupsTagsWithPagingRequestMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: product_pb.ProductsWithTotalItemsResponseMessage|null) => void
  ): UnaryResponse;
  getByGroupsTagsWithPaging(
    requestMessage: product_pb.ProductsByGroupsTagsWithPagingRequestMessage,
    callback: (error: ServiceError|null, responseMessage: product_pb.ProductsWithTotalItemsResponseMessage|null) => void
  ): UnaryResponse;
  getByCategoryId(
    requestMessage: product_pb.ProductsByCategoryIdRequestMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: product_pb.ProductsResponseMessage|null) => void
  ): UnaryResponse;
  getByCategoryId(
    requestMessage: product_pb.ProductsByCategoryIdRequestMessage,
    callback: (error: ServiceError|null, responseMessage: product_pb.ProductsResponseMessage|null) => void
  ): UnaryResponse;
  getByCategoryIds(
    requestMessage: product_pb.ProductsByCategoryIdsRequestMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: product_pb.ProductsResponseMessage|null) => void
  ): UnaryResponse;
  getByCategoryIds(
    requestMessage: product_pb.ProductsByCategoryIdsRequestMessage,
    callback: (error: ServiceError|null, responseMessage: product_pb.ProductsResponseMessage|null) => void
  ): UnaryResponse;
  getByCategorySlug(
    requestMessage: product_pb.ProductsByCategorySlugRequestMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: product_pb.ProductsResponseMessage|null) => void
  ): UnaryResponse;
  getByCategorySlug(
    requestMessage: product_pb.ProductsByCategorySlugRequestMessage,
    callback: (error: ServiceError|null, responseMessage: product_pb.ProductsResponseMessage|null) => void
  ): UnaryResponse;
  getByFirstCategory(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: product_pb.ProductsResponseMessage|null) => void
  ): UnaryResponse;
  getByFirstCategory(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: product_pb.ProductsResponseMessage|null) => void
  ): UnaryResponse;
  getById(
    requestMessage: product_pb.ProductByIdRequestMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: product_pb.ProductResponseMessage|null) => void
  ): UnaryResponse;
  getById(
    requestMessage: product_pb.ProductByIdRequestMessage,
    callback: (error: ServiceError|null, responseMessage: product_pb.ProductResponseMessage|null) => void
  ): UnaryResponse;
  getBySlug(
    requestMessage: product_pb.ProductBySlugRequestMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: product_pb.ProductResponseMessage|null) => void
  ): UnaryResponse;
  getBySlug(
    requestMessage: product_pb.ProductBySlugRequestMessage,
    callback: (error: ServiceError|null, responseMessage: product_pb.ProductResponseMessage|null) => void
  ): UnaryResponse;
}

