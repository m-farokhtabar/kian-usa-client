// package: 
// file: catalog.proto

var catalog_pb = require("./catalog_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var CatalogSrv = (function () {
  function CatalogSrv() {}
  CatalogSrv.serviceName = "CatalogSrv";
  return CatalogSrv;
}());

CatalogSrv.GetLandedPriceCatalogUrl = {
  methodName: "GetLandedPriceCatalogUrl",
  service: CatalogSrv,
  requestStream: false,
  responseStream: false,
  requestType: catalog_pb.LandedPriceCatalogRequestMessage,
  responseType: catalog_pb.CatalogResponseMessage
};

CatalogSrv.DownloadCatalog = {
  methodName: "DownloadCatalog",
  service: CatalogSrv,
  requestStream: false,
  responseStream: false,
  requestType: catalog_pb.DownloadCatalogRequest,
  responseType: catalog_pb.DownloadCatalogResponse
};

CatalogSrv.DownloadAdvanceCatalog = {
  methodName: "DownloadAdvanceCatalog",
  service: CatalogSrv,
  requestStream: false,
  responseStream: false,
  requestType: catalog_pb.DownloadAdvanceCatalogRequest,
  responseType: catalog_pb.DownloadCatalogResponse
};

exports.CatalogSrv = CatalogSrv;

function CatalogSrvClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

CatalogSrvClient.prototype.getLandedPriceCatalogUrl = function getLandedPriceCatalogUrl(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CatalogSrv.GetLandedPriceCatalogUrl, {
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

CatalogSrvClient.prototype.downloadCatalog = function downloadCatalog(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CatalogSrv.DownloadCatalog, {
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

CatalogSrvClient.prototype.downloadAdvanceCatalog = function downloadAdvanceCatalog(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CatalogSrv.DownloadAdvanceCatalog, {
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

exports.CatalogSrvClient = CatalogSrvClient;

