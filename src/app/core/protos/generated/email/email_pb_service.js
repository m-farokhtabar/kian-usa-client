// package: 
// file: email.proto

var email_pb = require("./email_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var EmailSrv = (function () {
  function EmailSrv() {}
  EmailSrv.serviceName = "EmailSrv";
  return EmailSrv;
}());

EmailSrv.SendCatalog = {
  methodName: "SendCatalog",
  service: EmailSrv,
  requestStream: false,
  responseStream: false,
  requestType: email_pb.SendCatalogRequestMessage,
  responseType: email_pb.SendResponseMessage
};

EmailSrv.SendCatalogAdvanced = {
  methodName: "SendCatalogAdvanced",
  service: EmailSrv,
  requestStream: false,
  responseStream: false,
  requestType: email_pb.SendAdvancedCatalogRequest,
  responseType: email_pb.SendResponseMessage
};

EmailSrv.SendCatalogWithLandedPrice = {
  methodName: "SendCatalogWithLandedPrice",
  service: EmailSrv,
  requestStream: false,
  responseStream: false,
  requestType: email_pb.SendCatalogWithLandedPriceRequestMessage,
  responseType: email_pb.SendResponseMessage
};

EmailSrv.SendContactUs = {
  methodName: "SendContactUs",
  service: EmailSrv,
  requestStream: false,
  responseStream: false,
  requestType: email_pb.SendContactUsRequestMessage,
  responseType: email_pb.SendResponseMessage
};

exports.EmailSrv = EmailSrv;

function EmailSrvClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

EmailSrvClient.prototype.sendCatalog = function sendCatalog(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EmailSrv.SendCatalog, {
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

EmailSrvClient.prototype.sendCatalogAdvanced = function sendCatalogAdvanced(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EmailSrv.SendCatalogAdvanced, {
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

EmailSrvClient.prototype.sendCatalogWithLandedPrice = function sendCatalogWithLandedPrice(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EmailSrv.SendCatalogWithLandedPrice, {
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

EmailSrvClient.prototype.sendContactUs = function sendContactUs(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EmailSrv.SendContactUs, {
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

exports.EmailSrvClient = EmailSrvClient;

