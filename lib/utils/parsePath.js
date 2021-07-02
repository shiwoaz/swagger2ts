"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var findType_1 = __importDefault(require("./findType"));
var parsePath = function (path, components) {
    var keys = Object.keys(path);
    // console.log(keys);
    var allPath = [];
    keys.forEach(function (key) {
        //@ts-ignore
        var info = path[key];
        Object.keys(info).forEach(function (subItem) {
            var item = {};
            var sub = info[subItem];
            item.url = key;
            item.summary = sub['summary'];
            item.tags = sub['tags'][0];
            item.method = subItem;
            item.requestType = findType_1.default(sub['requestBody'], components);
            item.responseType = findType_1.default(sub['responses'], components);
            // console.log(item);
            // console.log('-------------------1111111111');
            allPath.push(item);
        });
    });
    return allPath;
};
exports.default = parsePath;
