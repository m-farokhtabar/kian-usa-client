// package: 
// file: product.proto

var product_pb = require("./product_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var ProductSrv = (function () {
  function ProductSrv() {}
  ProductSrv.serviceName = "ProductSrv";
  return ProductSrv;
}());

ProductSrv.GetAll = {
  methodName: "GetAll",
  service: ProductSrv,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: product_pb.ProductsResponseMessage
};

ProductSrv.GetByGroupsTagsWithPaging = {
  methodName: "GetByGroupsTagsWithPaging",
  service: ProductSrv,
  requestStream: false,
  responseStream: false,
  requestType: product_pb.ProductsByGroupsTagsWithPagingRequestMessage,
  responseType: product_pb.ProductsWithTotalItemsResponseMessage
};

ProductSrv.GetByCategoryId = {
  methodName: "GetByCategoryId",
  service: ProductSrv,
  requestStream: false,
  responseStream: false,
  requestType: product_pb.ProductsByCategoryIdRequestMessage,
  responseType: product_pb.ProductsResponseMessage
};

ProductSrv.GetByCategoryIds = {
  methodName: "GetByCategoryIds",
  service: ProductSrv,
  requestStream: false,
  responseStream: false,
  requestType: product_pb.ProductsByCategoryIdsRequestMessage,
  responseType: product_pb.ProductsResponseMessage
};

ProductSrv.GetByCategorySlug = {
  methodName: "GetByCategorySlug",
  service: ProductSrv,
  requestStream: false,
  responseStream: false,
  requestType: product_pb.ProductsByCategorySlugRequestMessage,
  responseType: product_pb.ProductsResponseMessage
};

ProductSrv.GetByFirstCategory = {
  methodName: "GetByFirstCategory",
  service: ProductSrv,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: product_pb.ProductsResponseMessage
};

ProductSrv.GetById = {
  methodName: "GetById",
  service: ProductSrv,
  requestStream: false,
  responseStream: false,
  requestType: product_pb.ProductByIdRequestMessage,
  responseType: product_pb.ProductResponseMessage
};

ProductSrv.GetBySlug = {
  methodName: "GetBySlug",
  service: ProductSrv,
  requestStream: false,
  responseStream: false,
  requestType: product_pb.ProductBySlugRequestMessage,
  responseType: product_pb.ProductResponseMessage
};

exports.ProductSrv = ProductSrv;

function ProductSrvClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ProductSrvClient.prototype.getAll = function getAll(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProductSrv.GetAll, {
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

ProductSrvClient.prototype.getByGroupsTagsWithPaging = function getByGroupsTagsWithPaging(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProductSrv.GetByGroupsTagsWithPaging, {
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

ProductSrvClient.prototype.getByCategoryId = function getByCategoryId(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProductSrv.GetByCategoryId, {
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

ProductSrvClient.prototype.getByCategoryIds = function getByCategoryIds(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProductSrv.GetByCategoryIds, {
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

ProductSrvClient.prototype.getByCategorySlug = function getByCategorySlug(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProductSrv.GetByCategorySlug, {
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

ProductSrvClient.prototype.getByFirstCategory = function getByFirstCategory(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProductSrv.GetByFirstCategory, {
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

ProductSrvClient.prototype.getById = function getById(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProductSrv.GetById, {
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

ProductSrvClient.prototype.getBySlug = function getBySlug(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProductSrv.GetBySlug, {
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

exports.ProductSrvClient = ProductSrvClient;

