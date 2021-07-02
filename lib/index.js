"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createFunc_1 = __importDefault(require("./utils/createFunc"));
var gen_1 = __importDefault(require("./utils/gen"));
var parsePath_1 = __importDefault(require("./utils/parsePath"));
var request_1 = __importDefault(require("./utils/request"));
var saveFile_1 = require("./utils/saveFile");
var sdtout_1 = require("./utils/sdtout");
var sparate_1 = __importDefault(require("./utils/sparate"));
var HELPTXT = "\n  swagger2ts is a tool for generating TypeScript service code from swagger\n\n  [GITHUB]: https://github.com/shiwoaz/swagger2ts\n\n  ts-node src/index.ts [options]=[value]\n\n  url                    Swagger url\n\n  ( i.e ts-node src/index.ts url=http://10.1.1.1/swagger/%E8%B/swagger.json )\n";
(function () {
    var params = process.argv.slice(2);
    if (params.length === 0) {
        process.stdout.write(HELPTXT);
        process.exit(0);
    }
    var config = {
        url: undefined
    };
    params.forEach(function (item) {
        var _a = sparate_1.default(item), name = _a[0], value = _a[1];
        switch (name) {
            case "url":
                config.url = value;
                break;
            default:
                sdtout_1.WARNING(name + " ------- " + value);
                break;
        }
    });
    var url = config.url;
    if (!url) {
        sdtout_1.ERROR("Miss require params \"url\"");
    }
    request_1.default(config).then(function (_a) {
        var paths = _a.paths, components = _a.components;
        var allPath = parsePath_1.default(paths, components);
        var allRes = gen_1.default(allPath);
        var funcText = createFunc_1.default(allRes);
        saveFile_1.saveFunc(funcText);
        saveFile_1.saveType(allRes);
        sdtout_1.SUCESS("File write sucessful ! , please copy the \"type.d.ts\" and \"service.ts\" from \"dist\" dir, and import request from \"umi-request\"");
    });
})();
