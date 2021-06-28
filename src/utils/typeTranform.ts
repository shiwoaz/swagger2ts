import ts from 'typescript'

const typeTranform = (typeItem: any) => {

  const type = typeItem.type ?? 'any'

  let returnValue: any = 123

  switch (type) {
    case 'object':
      returnValue = findObject(typeItem.properties)
    default:
      break;
  }

  return returnValue

}

const findObject = (obj: any) => {

  const arr: Array<{
    type?: string,
    description?: string
  }> = []

  Object.keys(obj).forEach((item) => {

    const oi = obj[item]

    const objItem: {
      type?: string,
      description?: string
    } = {}

    objItem.type = type2ts(oi['type'])
    objItem.description = oi['description'] ?? "none"

    arr.push(objItem)
  })

  return arr
}

const findArray = (arr: Array<any>) => {

}

const type2ts = (type: string) => {
  switch (type) {
    case 'integer':
      return 'number'

    case 'string':
      return 'string'

    default:
      return 'any'

  }
}

export default typeTranform