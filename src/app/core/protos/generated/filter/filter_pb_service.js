// package: 
// file: filter.proto

var filter_pb = require("./filter_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var FilterSrv = (function () {
  function FilterSrv() {}
  FilterSrv.serviceName = "FilterSrv";
  return FilterSrv;
}());

FilterSrv.GetAll = {
  methodName: "GetAll",
  service: FilterSrv,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: filter_pb.FiltersResponseMessage
};

exports.FilterSrv = FilterSrv;

function FilterSrvClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

FilterSrvClient.prototype.getAll = function getAll(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(FilterSrv.GetAll, {
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

exports.FilterSrvClient = FilterSrvClient;

