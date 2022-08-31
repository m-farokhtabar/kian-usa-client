// package: 
// file: category.proto

var category_pb = require("./category_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var CategorySrv = (function () {
  function CategorySrv() {}
  CategorySrv.serviceName = "CategorySrv";
  return CategorySrv;
}());

CategorySrv.GetAll = {
  methodName: "GetAll",
  service: CategorySrv,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: category_pb.CategoriesResponseMessage
};

CategorySrv.GetAllWithChildren = {
  methodName: "GetAllWithChildren",
  service: CategorySrv,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: category_pb.CategoriesResponseMessage
};

CategorySrv.GetAllShortData = {
  methodName: "GetAllShortData",
  service: CategorySrv,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: category_pb.CategoriesShortDataResponseMessage
};

CategorySrv.GetById = {
  methodName: "GetById",
  service: CategorySrv,
  requestStream: false,
  responseStream: false,
  requestType: category_pb.CategoryByIdRequestMessage,
  responseType: category_pb.CategoryResponseMessage
};

CategorySrv.GetBySlug = {
  methodName: "GetBySlug",
  service: CategorySrv,
  requestStream: false,
  responseStream: false,
  requestType: category_pb.CategoryBySlugRequestMessage,
  responseType: category_pb.CategoryResponseMessage
};

CategorySrv.GetBySlugWithChildren = {
  methodName: "GetBySlugWithChildren",
  service: CategorySrv,
  requestStream: false,
  responseStream: false,
  requestType: category_pb.CategoryBySlugRequestMessage,
  responseType: category_pb.CategoriesResponseMessage
};

CategorySrv.GetByFilter = {
  methodName: "GetByFilter",
  service: CategorySrv,
  requestStream: false,
  responseStream: false,
  requestType: category_pb.CategoryByTagsRequestMessage,
  responseType: category_pb.CategoriesResponseMessage
};

CategorySrv.GetFirst = {
  methodName: "GetFirst",
  service: CategorySrv,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: category_pb.CategoryResponseMessage
};

exports.CategorySrv = CategorySrv;

function CategorySrvClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

CategorySrvClient.prototype.getAll = function getAll(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CategorySrv.GetAll, {
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

CategorySrvClient.prototype.getAllWithChildren = function getAllWithChildren(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CategorySrv.GetAllWithChildren, {
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

CategorySrvClient.prototype.getAllShortData = function getAllShortData(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CategorySrv.GetAllShortData, {
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

CategorySrvClient.prototype.getById = function getById(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CategorySrv.GetById, {
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

CategorySrvClient.prototype.getBySlug = function getBySlug(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CategorySrv.GetBySlug, {
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

CategorySrvClient.prototype.getBySlugWithChildren = function getBySlugWithChildren(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CategorySrv.GetBySlugWithChildren, {
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

CategorySrvClient.prototype.getByFilter = function getByFilter(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CategorySrv.GetByFilter, {
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

CategorySrvClient.prototype.getFirst = function getFirst(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CategorySrv.GetFirst, {
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

exports.CategorySrvClient = CategorySrvClient;

