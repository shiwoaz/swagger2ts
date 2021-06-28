import ts, { factory } from 'typescript'

const createType = (arr: Array<any>) => {
  arr.map(item => {

    const { name } = item

    factory.createTypeAliasDeclaration(
      undefined,
      undefined,
      factory.createIdentifier(name),
      undefined
    )
  })
}