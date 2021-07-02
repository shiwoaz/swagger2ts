"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_1 = __importStar(require("typescript"));
var printer = typescript_1.default.createPrinter({ newLine: typescript_1.default.NewLineKind.LineFeed });
var createType = function (arr, typeName, typeComment) {
    var typeSourceFile = typescript_1.default.createSourceFile(typeName, '', typescript_1.default.ScriptTarget.Latest, false, typescript_1.default.ScriptKind.TS);
    var typeAst = typescript_1.factory.createTypeAliasDeclaration(undefined, [typescript_1.factory.createModifier(typescript_1.default.SyntaxKind.ExportKeyword)], typescript_1.factory.createIdentifier(typeName.replace(/{|}/g, '')), undefined, typescript_1.factory.createTypeLiteralNode(arr.map(function (_a) {
        var name = _a.name, type = _a.type;
        return typescript_1.factory.createPropertySignature(undefined, typescript_1.factory.createIdentifier(name.replace(/{|}/g, '')), undefined, typescript_1.factory.createKeywordTypeNode(tranformTsType(type)));
    })));
    typescript_1.default.addSyntheticLeadingComment(typeAst, typescript_1.default.SyntaxKind.MultiLineCommentTrivia, typeComment, true);
    // console.log(printer.printNode(ts.EmitHint.Unspecified, typeAst, typeSourceFile));
    return printer.printNode(typescript_1.default.EmitHint.Unspecified, typeAst, typeSourceFile);
};
var tranformTsType = function (type) {
    switch (type) {
        case 'number':
            return typescript_1.default.SyntaxKind.NumberKeyword;
        case 'string':
            return typescript_1.default.SyntaxKind.StringKeyword;
        default:
            return typescript_1.default.SyntaxKind.AnyKeyword;
    }
};
exports.default = createType;
