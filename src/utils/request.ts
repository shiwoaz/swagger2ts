import fetch from 'node-fetch'
import { configObject, swagger } from '../type'
import { ERROR } from './sdtout'

type fetchSwaggerJsonFunc = (config: configObject) => Promise<swagger>

const fetchSwaggerJson: fetchSwaggerJsonFunc = async ({ url }) => {

  try {

    const result = await fetch(url!)

    return await result.json()

  } catch (x) {
    ERROR(`Unexpect error occured with url --- ${url}`)
  }

}

export default fetchSwaggerJson