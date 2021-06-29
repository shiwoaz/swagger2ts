import { Schemas } from "../type";
import typeTranform from "./typeTranform";

const findType = (type: any, source: Schemas) => {

  if (typeof type === 'undefined') return
  // console.log("--------------------------------------------------")

  // console.dir(type['content']);

  // console.log(source, "s");
  let typeArr: {
    type?: string | undefined;
    description?: string | undefined;
  }[] = []

  if (type['content']) {

    Object.keys(type['content']).some(key => {
      if (type['content'][key]['schema']['$ref']) {

        const t = type['content'][key]['schema']['$ref'] as string

        const typeTitle = t.match(/\/(\w*)/g)?.pop()?.slice(1)

        //@ts-ignore
        typeArr = typeTranform(source['schemas'][typeTitle])
        return false
      } else {
        console.log('none1');
      }

    })
  } else if (type['200']['content']) {
    if (type['200']['content']['application/json']['schema']['$ref']) {
      const t = type['200']['content']['application/json']['schema']['$ref'] as string
      const typeTitle = t.match(/\/(\w*)/g)?.pop()?.slice(1)
      //@ts-ignore
      typeArr = typeTranform(source['schemas'][typeTitle])
    }
  }

  return typeArr ?? []
}

export default findType