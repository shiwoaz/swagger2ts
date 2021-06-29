import { WriteStream } from 'fs'
import ts, { factory } from 'typescript'

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

const createType = (arr: Array<any>, typeName: string) => {

  // console.log(888888888888888);
  // console.log(arr, typeName);
  // console.log(888888888888888);

  const typeSourceFile = ts.createSourceFile(typeName, '', ts.ScriptTarget.Latest, false, ts.ScriptKind.TS)

  const typeAst = factory.createTypeAliasDeclaration(
    undefined,
    [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    factory.createIdentifier(typeName.replace(/{|}/g, '')),
    undefined,
    factory.createTypeLiteralNode(
      arr.map(({ name, type }: { name: string, type: any }) => factory.createPropertySignature(
        undefined,
        factory.createIdentifier(name.replace(/{|}/g, '')),
        undefined,
        factory.createKeywordTypeNode(tranformTsType(type))
      ))
    )
  )

  // console.log(printer.printNode(ts.EmitHint.Unspecified, typeAst, typeSourceFile));

  return printer.printNode(ts.EmitHint.Unspecified, typeAst, typeSourceFile)
}


const tranformTsType = (type: "number" | "string" | "any"): ts.KeywordTypeSyntaxKind => {
  switch (type) {
    case 'number':
      return ts.SyntaxKind.NumberKeyword
    case 'string':
      return ts.SyntaxKind.StringKeyword
    default:
      return ts.SyntaxKind.AnyKeyword
  }
}
export default createType