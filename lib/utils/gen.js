"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createType_1 = __importDefault(require("./createType"));
var genCode = function (allPath) {
    return allPath.map(function (item) {
        var url = item.url, requestType = item.requestType, responseType = item.responseType, summary = item.summary, tags = item.tags;
        var typeName = tags + " - " + summary + "  ";
        var name = url.split('/').slice(-1);
        var requestTypeText = createType_1.default(requestType !== null && requestType !== void 0 ? requestType : [], name + "ReqType", typeName + "请求结构");
        var responseTypeText = createType_1.default(responseType !== null && responseType !== void 0 ? responseType : [], name + "ResType", typeName + "响应结构");
        return __assign(__assign({}, item), { requestTypeText: requestTypeText, responseTypeText: responseTypeText });
    });
};
exports.default = genCode;
