// source: catalog.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() { return this || window || global || self || Function('return this')(); }).call(null);

goog.exportSymbol('proto.CatalogResponseMessage', null, global);
goog.exportSymbol('proto.LandedPriceCatalogRequestMessage', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.LandedPriceCatalogRequestMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.LandedPriceCatalogRequestMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.LandedPriceCatalogRequestMessage.displayName = 'proto.LandedPriceCatalogRequestMessage';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.CatalogResponseMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.CatalogResponseMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.CatalogResponseMessage.displayName = 'proto.CatalogResponseMessage';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.LandedPriceCatalogRequestMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.LandedPriceCatalogRequestMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.LandedPriceCatalogRequestMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.LandedPriceCatalogRequestMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    catalogslug: jspb.Message.getFieldWithDefault(msg, 1, ""),
    factor: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.LandedPriceCatalogRequestMessage}
 */
proto.LandedPriceCatalogRequestMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.LandedPriceCatalogRequestMessage;
  return proto.LandedPriceCatalogRequestMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.LandedPriceCatalogRequestMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.LandedPriceCatalogRequestMessage}
 */
proto.LandedPriceCatalogRequestMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setCatalogslug(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setFactor(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.LandedPriceCatalogRequestMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.LandedPriceCatalogRequestMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.LandedPriceCatalogRequestMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.LandedPriceCatalogRequestMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCatalogslug();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFactor();
  if (f !== 0.0) {
    writer.writeDouble(
      2,
      f
    );
  }
};


/**
 * optional string CatalogSlug = 1;
 * @return {string}
 */
proto.LandedPriceCatalogRequestMessage.prototype.getCatalogslug = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.LandedPriceCatalogRequestMessage} returns this
 */
proto.LandedPriceCatalogRequestMessage.prototype.setCatalogslug = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional double Factor = 2;
 * @return {number}
 */
proto.LandedPriceCatalogRequestMessage.prototype.getFactor = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.LandedPriceCatalogRequestMessage} returns this
 */
proto.LandedPriceCatalogRequestMessage.prototype.setFactor = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.CatalogResponseMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.CatalogResponseMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.CatalogResponseMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.CatalogResponseMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    urlcurrent: jspb.Message.getFieldWithDefault(msg, 1, ""),
    urlall: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.CatalogResponseMessage}
 */
proto.CatalogResponseMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.CatalogResponseMessage;
  return proto.CatalogResponseMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.CatalogResponseMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.CatalogResponseMessage}
 */
proto.CatalogResponseMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrlcurrent(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUrlall(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.CatalogResponseMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.CatalogResponseMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.CatalogResponseMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.CatalogResponseMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getUrlcurrent();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUrlall();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string UrlCurrent = 1;
 * @return {string}
 */
proto.CatalogResponseMessage.prototype.getUrlcurrent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.CatalogResponseMessage} returns this
 */
proto.CatalogResponseMessage.prototype.setUrlcurrent = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string UrlAll = 2;
 * @return {string}
 */
proto.CatalogResponseMessage.prototype.getUrlall = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.CatalogResponseMessage} returns this
 */
proto.CatalogResponseMessage.prototype.setUrlall = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


goog.object.extend(exports, proto);