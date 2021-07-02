"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeTranform = function (typeItem) {
    var _a;
    var type = (_a = typeItem.type) !== null && _a !== void 0 ? _a : 'any';
    var returnValue = 123;
    switch (type) {
        case 'object':
            returnValue = findObject(typeItem.properties);
        default:
            break;
    }
    return returnValue;
};
var findObject = function (obj) {
    var arr = [];
    Object.keys(obj).forEach(function (item) {
        var _a;
        var oi = obj[item];
        var objItem = {};
        // console.log(oi, 'ioioio', item);
        objItem.type = type2ts(oi['type']);
        objItem.description = (_a = oi['description']) !== null && _a !== void 0 ? _a : "none";
        objItem.name = item;
        arr.push(objItem);
    });
    return arr;
};
var findArray = function (arr) {
};
var type2ts = function (type) {
    switch (type) {
        case 'integer':
            return 'number';
        case 'string':
            return 'string';
        default:
            return 'any';
    }
};
exports.default = typeTranform;
