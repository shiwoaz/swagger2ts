"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUCESS = exports.ERROR = exports.WARNING = void 0;
var chalk_1 = __importDefault(require("chalk"));
var outType = {
    info: chalk_1.default.blue('ℹ'),
    success: chalk_1.default.green('✔'),
    warning: chalk_1.default.yellow('⚠'),
    error: chalk_1.default.red('✖')
};
var WARNING = function (text) {
    console.log(chalk_1.default.yellowBright(outType['warning'] + " [WARN] " + text));
};
exports.WARNING = WARNING;
var ERROR = function (text) {
    console.log(chalk_1.default.redBright(outType['error'] + " [ERROR] " + text));
    process.exit(0);
};
exports.ERROR = ERROR;
var SUCESS = function (text) {
    console.log(chalk_1.default.greenBright(outType['success'] + " [SUCESS] " + text));
};
exports.SUCESS = SUCESS;
