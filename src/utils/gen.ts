import createType from "./createType";
import { pathItemInfo } from "./parsePath";

const genCode = (allPath: pathItemInfo[]) => {
  return allPath.map(item => {
    // console.log("9999999999999999");

    // console.log(item);
    // console.log("9999999999999999");
    const { url, requestType, responseType } = item

    const name = url.split('/').slice(-1)

    const requestTypeText = createType(requestType ?? [], name + "ReqType")
    const responseTypeText = createType(responseType ?? [], name + "ResType")

    return { ...item, requestTypeText, responseTypeText }
  })
}

export default genCode