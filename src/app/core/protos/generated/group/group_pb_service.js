// package: 
// file: group.proto

var group_pb = require("./group_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var GroupSrv = (function () {
  function GroupSrv() {}
  GroupSrv.serviceName = "GroupSrv";
  return GroupSrv;
}());

GroupSrv.GetAll = {
  methodName: "GetAll",
  service: GroupSrv,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: group_pb.GroupsResponseMessage
};

exports.GroupSrv = GroupSrv;

function GroupSrvClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

GroupSrvClient.prototype.getAll = function getAll(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GroupSrv.GetAll, {
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

exports.GroupSrvClient = GroupSrvClient;

