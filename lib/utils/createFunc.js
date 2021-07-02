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
var createFunc = function (allPath) {
    var FuncSourceFile = typescript_1.default.createSourceFile('Func', '', typescript_1.default.ScriptTarget.Latest, false, typescript_1.default.ScriptKind.TS);
    var funcAst = allPath.map(function (_a) {
        var requestType = _a.requestType, url = _a.url, responseType = _a.responseType, method = _a.method, summary = _a.summary, tags = _a.tags;
        var params = hasParams(requestType);
        // const ret = hasParams(responseType)
        var typeName = tags + " - " + summary + "  ";
        var name = url.split('/').slice(-1)[0].replace(/{|}/g, '');
        var ast = typescript_1.factory.createVariableStatement([typescript_1.factory.createModifier(typescript_1.default.SyntaxKind.ExportKeyword)], typescript_1.factory.createVariableDeclarationList([
            typescript_1.factory.createVariableDeclaration(typescript_1.factory.createIdentifier(name), undefined, undefined, typescript_1.factory.createArrowFunction(undefined, undefined, hParams(params, name), typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier('Promise'), [
                typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier(name + "ResType"), undefined)
            ]), typescript_1.factory.createToken(typescript_1.default.SyntaxKind.EqualsGreaterThanToken), typescript_1.factory.createBlock([
                typescript_1.factory.createReturnStatement(typescript_1.factory.createCallExpression(typescript_1.factory.createIdentifier("request"), undefined, [
                    typescript_1.factory.createNoSubstitutionTemplateLiteral(url, url),
                    typescript_1.factory.createObjectLiteralExpression(obj(method, params), true)
                ]))
            ], true)))
        ], typescript_1.default.NodeFlags.Const));
        typescript_1.default.addSyntheticLeadingComment(ast, typescript_1.default.SyntaxKind.MultiLineCommentTrivia, typeName, true);
        return ast;
    });
    // console.log(printer.printNode(ts.EmitHint.Unspecified, funcAst[0], FuncSourceFile));
    return funcAst.map(function (i) { return printer.printNode(typescript_1.default.EmitHint.Unspecified, i, FuncSourceFile); });
};
var hasParams = function (p) {
    if (typeof p === 'undefined')
        return undefined;
    return 'data';
};
var obj = function (method, hasParams) {
    var common = typescript_1.factory.createPropertyAssignment(typescript_1.factory.createIdentifier("method"), typescript_1.factory.createStringLiteral(method));
    if (hasParams) {
        return [
            common,
            typescript_1.factory.createShorthandPropertyAssignment(typescript_1.factory.createIdentifier("data"), undefined)
        ];
    }
    else {
        return [common];
    }
};
var hParams = function (hasParams, name) {
    if (hasParams) {
        return [
            typescript_1.factory.createParameterDeclaration(undefined, undefined, undefined, hasParams, undefined, typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier(name + "ReqType")), undefined)
        ];
    }
    else {
        return [];
    }
};
exports.default = createFunc;
