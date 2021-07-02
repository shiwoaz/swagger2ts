"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFunc = exports.saveType = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var sdtout_1 = require("./sdtout");
var filePath = path_1.default.join(process.cwd(), './dist/');
(function () {
    fs_1.default.stat(filePath, (function (err) {
        if (err) {
            sdtout_1.WARNING("dist folder don't exit, create now");
            fs_1.default.mkdirSync(filePath);
            sdtout_1.SUCESS(filePath + " successfully created!");
        }
    }));
})();
console.log(filePath);
var saveType = function (data) {
    var Text = data.map(function (_a) {
        var responseTypeText = _a.responseTypeText, requestTypeText = _a.requestTypeText;
        return "\n    " + requestTypeText + "\n\n    " + responseTypeText + "\n  ";
    }).join('');
    fs_1.default.writeFile(path_1.default.join(filePath, "type.d.ts"), Text, function (err) {
        if (err) {
            sdtout_1.ERROR("type file write failed  --> " + err);
        }
    });
};
exports.saveType = saveType;
var saveFunc = function (data) {
    fs_1.default.writeFile(path_1.default.join(filePath, 'service.ts'), data.join(''), function (err) {
        if (err) {
            sdtout_1.ERROR("function file write failed  --> " + err);
        }
    });
};
exports.saveFunc = saveFunc;
