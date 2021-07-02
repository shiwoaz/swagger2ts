"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeTranform_1 = __importDefault(require("./typeTranform"));
var findType = function (type, source) {
    var _a, _b;
    if (typeof type === 'undefined')
        return;
    // console.log("--------------------------------------------------")
    // console.dir(type['content']);
    // console.log(source, "s");
    var typeArr = [];
    if (type['content']) {
        Object.keys(type['content']).some(function (key) {
            var _a, _b;
            if (type['content'][key]['schema']['$ref']) {
                var t = type['content'][key]['schema']['$ref'];
                var typeTitle = (_b = (_a = t.match(/\/(\w*)/g)) === null || _a === void 0 ? void 0 : _a.pop()) === null || _b === void 0 ? void 0 : _b.slice(1);
                //@ts-ignore
                typeArr = typeTranform_1.default(source['schemas'][typeTitle]);
                return false;
            }
            else {
                // console.log('none1');
            }
        });
    }
    else if (type['200']['content']) {
        if (type['200']['content']['application/json']['schema']['$ref']) {
            var t = type['200']['content']['application/json']['schema']['$ref'];
            var typeTitle = (_b = (_a = t.match(/\/(\w*)/g)) === null || _a === void 0 ? void 0 : _a.pop()) === null || _b === void 0 ? void 0 : _b.slice(1);
            //@ts-ignore
            typeArr = typeTranform_1.default(source['schemas'][typeTitle]);
        }
    }
    return typeArr !== null && typeArr !== void 0 ? typeArr : [];
};
exports.default = findType;
