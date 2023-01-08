// package: 
// file: account.proto

var account_pb = require("./account_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var AccountSrc = (function () {
  function AccountSrc() {}
  AccountSrc.serviceName = "AccountSrc";
  return AccountSrc;
}());

AccountSrc.Login = {
  methodName: "Login",
  service: AccountSrc,
  requestStream: false,
  responseStream: false,
  requestType: account_pb.LoginRequestMessage,
  responseType: account_pb.LoginResponseMessage
};

AccountSrc.GetCustomersOfRep = {
  methodName: "GetCustomersOfRep",
  service: AccountSrc,
  requestStream: false,
  responseStream: false,
  requestType: account_pb.CustomersOfRepRequestMessage,
  responseType: account_pb.CustomersOfRepResponseMessage
};

exports.AccountSrc = AccountSrc;

function AccountSrcClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

AccountSrcClient.prototype.login = function login(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AccountSrc.Login, {
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

AccountSrcClient.prototype.getCustomersOfRep = function getCustomersOfRep(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AccountSrc.GetCustomersOfRep, {
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

exports.AccountSrcClient = AccountSrcClient;

