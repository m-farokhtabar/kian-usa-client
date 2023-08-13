// package: 
// file: po.proto

var po_pb = require("./po_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var PoSrv = (function () {
  function PoSrv() {}
  PoSrv.serviceName = "PoSrv";
  return PoSrv;
}());

PoSrv.Get = {
  methodName: "Get",
  service: PoSrv,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: po_pb.PoResponse
};

PoSrv.Save = {
  methodName: "Save",
  service: PoSrv,
  requestStream: false,
  responseStream: false,
  requestType: po_pb.PoDataSaveRequest,
  responseType: po_pb.PoSaveResponse
};

exports.PoSrv = PoSrv;

function PoSrvClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

PoSrvClient.prototype.get = function get(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PoSrv.Get, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

PoSrvClient.prototype.save = function save(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PoSrv.Save, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.PoSrvClient = PoSrvClient;

