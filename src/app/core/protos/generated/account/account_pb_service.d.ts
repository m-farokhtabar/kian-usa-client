// package: 
// file: account.proto

import * as account_pb from "./account_pb";
import {grpc} from "@improbable-eng/grpc-web";

type AccountSrcLogin = {
  readonly methodName: string;
  readonly service: typeof AccountSrc;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof account_pb.LoginRequestMessage;
  readonly responseType: typeof account_pb.LoginResponseMessage;
};

type AccountSrcGetCustomersOfRep = {
  readonly methodName: string;
  readonly service: typeof AccountSrc;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof account_pb.CustomersOfRepRequestMessage;
  readonly responseType: typeof account_pb.CustomersOfRepResponseMessage;
};

export class AccountSrc {
  static readonly serviceName: string;
  static readonly Login: AccountSrcLogin;
  static readonly GetCustomersOfRep: AccountSrcGetCustomersOfRep;
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

export class AccountSrcClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  login(
    requestMessage: account_pb.LoginRequestMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: account_pb.LoginResponseMessage|null) => void
  ): UnaryResponse;
  login(
    requestMessage: account_pb.LoginRequestMessage,
    callback: (error: ServiceError|null, responseMessage: account_pb.LoginResponseMessage|null) => void
  ): UnaryResponse;
  getCustomersOfRep(
    requestMessage: account_pb.CustomersOfRepRequestMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: account_pb.CustomersOfRepResponseMessage|null) => void
  ): UnaryResponse;
  getCustomersOfRep(
    requestMessage: account_pb.CustomersOfRepRequestMessage,
    callback: (error: ServiceError|null, responseMessage: account_pb.CustomersOfRepResponseMessage|null) => void
  ): UnaryResponse;
}

