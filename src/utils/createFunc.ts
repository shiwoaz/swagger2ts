import ts, { factory } from 'typescript'

import { resAllPath } from './parsePath'

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

const createFunc = (allPath: resAllPath[]) => {

  const FuncSourceFile = ts.createSourceFile('Func', '', ts.ScriptTarget.Latest, false, ts.ScriptKind.TS)


  const funcAst = allPath.map(({ requestType, url, responseType, method }) => {

    const params = hasParams(requestType)

    const ret = hasParams(responseType)

    const name = url.split('/').slice(-1)[0].replace(/{|}/g, '')

    return factory.createVariableStatement(
      [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      factory.createVariableDeclarationList(
        [
          factory.createVariableDeclaration(
            factory.createIdentifier(name),
            undefined,
            undefined,
            factory.createArrowFunction(
              undefined,
              undefined,
              hParams(params, name),
              factory.createTypeReferenceNode(
                factory.createIdentifier('Promise'),
                [
                  factory.createTypeReferenceNode(
                    factory.createIdentifier(name + "ResType"),
                    undefined
                  )
                ]
              ),
              factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
              factory.createBlock(
                [
                  factory.createReturnStatement(factory.createCallExpression(
                    factory.createIdentifier("request"),
                    undefined,
                    [
                      factory.createNoSubstitutionTemplateLiteral(
                        url,
                        url
                      ),
                      factory.createObjectLiteralExpression(
                        obj(method, params),
                        true
                      )
                    ]
                  ))
                ], true
              )
            )
          )
        ], ts.NodeFlags.Const
      )
    )
  })

  // console.log(printer.printNode(ts.EmitHint.Unspecified, funcAst[0], FuncSourceFile));

  return funcAst.map(i => printer.printNode(ts.EmitHint.Unspecified, i, FuncSourceFile))
}

const hasParams = (p: Array<any> | undefined) => {
  if (typeof p === 'undefined') return undefined
  return 'data'
}

const obj = (method: string, hasParams: any | undefined) => {

  const common = factory.createPropertyAssignment(
    factory.createIdentifier("method"),
    factory.createStringLiteral(method)
  )

  if (hasParams) {
    return [
      common,
      factory.createShorthandPropertyAssignment(
        factory.createIdentifier("data"),
        undefined
      )
    ]
  } else {
    return [common]
  }
}

const hParams = (hasParams: any | undefined, name: string) => {
  if (hasParams) {
    return [
      factory.createParameterDeclaration(
        undefined,
        undefined,
        undefined,
        hasParams,
        undefined,
        factory.createTypeReferenceNode(
          factory.createIdentifier(name + "ReqType")
        ),
        undefined
      )
    ]
  } else {
    return []
  }
}

export default createFunc