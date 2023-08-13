// package: 
// file: po.proto

import * as po_pb from "./po_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type PoSrvGet = {
  readonly methodName: string;
  readonly service: typeof PoSrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof po_pb.PoResponse;
};

type PoSrvSave = {
  readonly methodName: string;
  readonly service: typeof PoSrv;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof po_pb.PoDataSaveRequest;
  readonly responseType: typeof po_pb.PoSaveResponse;
};

export class PoSrv {
  static readonly serviceName: string;
  static readonly Get: PoSrvGet;
  static readonly Save: PoSrvSave;
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

export class PoSrvClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  get(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: po_pb.PoResponse|null) => void
  ): UnaryResponse;
  get(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: po_pb.PoResponse|null) => void
  ): UnaryResponse;
  save(
    requestMessage: po_pb.PoDataSaveRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: po_pb.PoSaveResponse|null) => void
  ): UnaryResponse;
  save(
    requestMessage: po_pb.PoDataSaveRequest,
    callback: (error: ServiceError|null, responseMessage: po_pb.PoSaveResponse|null) => void
  ): UnaryResponse;
}

