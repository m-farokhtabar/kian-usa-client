// package: 
// file: category.proto

import * as category_pb from "./category_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type CategorySrvGetAll = {
  readonly methodName: string;
  readonly service: typeof CategorySrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof category_pb.CategoriesResponseMessage;
};

type CategorySrvGetAllWithChildren = {
  readonly methodName: string;
  readonly service: typeof CategorySrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof category_pb.CategoriesResponseMessage;
};

type CategorySrvGetAllShortData = {
  readonly methodName: string;
  readonly service: typeof CategorySrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof category_pb.CategoriesShortDataResponseMessage;
};

type CategorySrvGetById = {
  readonly methodName: string;
  readonly service: typeof CategorySrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof category_pb.CategoryByIdRequestMessage;
  readonly responseType: typeof category_pb.CategoryResponseMessage;
};

type CategorySrvGetBySlug = {
  readonly methodName: string;
  readonly service: typeof CategorySrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof category_pb.CategoryBySlugRequestMessage;
  readonly responseType: typeof category_pb.CategoryResponseMessage;
};

type CategorySrvGetBySlugWithChildren = {
  readonly methodName: string;
  readonly service: typeof CategorySrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof category_pb.CategoryBySlugRequestMessage;
  readonly responseType: typeof category_pb.CategoriesResponseMessage;
};

type CategorySrvGetByFilter = {
  readonly methodName: string;
  readonly service: typeof CategorySrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof category_pb.CategoryByTagsRequestMessage;
  readonly responseType: typeof category_pb.CategoriesResponseMessage;
};

type CategorySrvGetFirst = {
  readonly methodName: string;
  readonly service: typeof CategorySrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof category_pb.CategoryResponseMessage;
};

export class CategorySrv {
  static readonly serviceName: string;
  static readonly GetAll: CategorySrvGetAll;
  static readonly GetAllWithChildren: CategorySrvGetAllWithChildren;
  static readonly GetAllShortData: CategorySrvGetAllShortData;
  static readonly GetById: CategorySrvGetById;
  static readonly GetBySlug: CategorySrvGetBySlug;
  static readonly GetBySlugWithChildren: CategorySrvGetBySlugWithChildren;
  static readonly GetByFilter: CategorySrvGetByFilter;
  static readonly GetFirst: CategorySrvGetFirst;
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

export class CategorySrvClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getAll(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: category_pb.CategoriesResponseMessage|null) => void
  ): UnaryResponse;
  getAll(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: category_pb.CategoriesResponseMessage|null) => void
  ): UnaryResponse;
  getAllWithChildren(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: category_pb.CategoriesResponseMessage|null) => void
  ): UnaryResponse;
  getAllWithChildren(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: category_pb.CategoriesResponseMessage|null) => void
  ): UnaryResponse;
  getAllShortData(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: category_pb.CategoriesShortDataResponseMessage|null) => void
  ): UnaryResponse;
  getAllShortData(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: category_pb.CategoriesShortDataResponseMessage|null) => void
  ): UnaryResponse;
  getById(
    requestMessage: category_pb.CategoryByIdRequestMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: category_pb.CategoryResponseMessage|null) => void
  ): UnaryResponse;
  getById(
    requestMessage: category_pb.CategoryByIdRequestMessage,
    callback: (error: ServiceError|null, responseMessage: category_pb.CategoryResponseMessage|null) => void
  ): UnaryResponse;
  getBySlug(
    requestMessage: category_pb.CategoryBySlugRequestMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: category_pb.CategoryResponseMessage|null) => void
  ): UnaryResponse;
  getBySlug(
    requestMessage: category_pb.CategoryBySlugRequestMessage,
    callback: (error: ServiceError|null, responseMessage: category_pb.CategoryResponseMessage|null) => void
  ): UnaryResponse;
  getBySlugWithChildren(
    requestMessage: category_pb.CategoryBySlugRequestMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: category_pb.CategoriesResponseMessage|null) => void
  ): UnaryResponse;
  getBySlugWithChildren(
    requestMessage: category_pb.CategoryBySlugRequestMessage,
    callback: (error: ServiceError|null, responseMessage: category_pb.CategoriesResponseMessage|null) => void
  ): UnaryResponse;
  getByFilter(
    requestMessage: category_pb.CategoryByTagsRequestMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: category_pb.CategoriesResponseMessage|null) => void
  ): UnaryResponse;
  getByFilter(
    requestMessage: category_pb.CategoryByTagsRequestMessage,
    callback: (error: ServiceError|null, responseMessage: category_pb.CategoriesResponseMessage|null) => void
  ): UnaryResponse;
  getFirst(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: category_pb.CategoryResponseMessage|null) => void
  ): UnaryResponse;
  getFirst(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: category_pb.CategoryResponseMessage|null) => void
  ): UnaryResponse;
}

