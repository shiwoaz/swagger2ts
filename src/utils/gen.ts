import createType from "./createType";
import { pathItemInfo } from "./parsePath";

const genCode = (allPath: pathItemInfo[]) => {
  return allPath.map(item => {

    const { url, requestType, responseType, summary, tags } = item

    const typeName = `${tags} - ${summary}  `

    const name = url.split('/').slice(-1)

    const requestTypeText = createType(requestType ?? [], name + "ReqType", typeName + "请求结构")
    const responseTypeText = createType(responseType ?? [], name + "ResType", typeName + "响应结构")

    return { ...item, requestTypeText, responseTypeText }
  })
}

export default genCode