import { Components, Paths, PostItem } from "../type";
import findType from "./findType";

export interface pathItemInfo {
  tags: string
  summary: string
  requestType: any
  responseType: any
  url: string
}

const parsePath = (path: Paths, components: Components) => {

  const keys = Object.keys(path)

  console.log(keys);

  const allPath: pathItemInfo[] = []

  keys.forEach(key => {

    //@ts-ignore
    const info = path[key]

    Object.keys(info).forEach(subItem => {

      const item: Partial<pathItemInfo> = {}

      const sub = info[subItem]

      item.url = key
      item.summary = sub['summary']
      item.tags = sub['tags'][0]

      console.log(sub);

      item.requestType = findType(sub['requestBody'], components)

      item.responseType = findType(sub['responses'], components)
      console.log(item);
console.log('-------------------1111111111');

      allPath.push(item as pathItemInfo)
    })

  })

  return allPath
}

export default parsePath