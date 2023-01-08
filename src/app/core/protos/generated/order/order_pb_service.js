// package: 
// file: order.proto

var order_pb = require("./order_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var OrderSrv = (function () {
  function OrderSrv() {}
  OrderSrv.serviceName = "OrderSrv";
  return OrderSrv;
}());

OrderSrv.SendOrder = {
  methodName: "SendOrder",
  service: OrderSrv,
  requestStream: false,
  responseStream: false,
  requestType: order_pb.OrderRequestMessage,
  responseType: order_pb.OrderResponseMessage
};

exports.OrderSrv = OrderSrv;

function OrderSrvClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

OrderSrvClient.prototype.sendOrder = function sendOrder(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(OrderSrv.SendOrder, {
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

exports.OrderSrvClient = OrderSrvClient;

