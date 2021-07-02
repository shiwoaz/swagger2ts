import fetch from 'node-fetch'
import ora from 'ora'
import { configObject, swagger } from '../type'
import { ERROR } from './sdtout'

type fetchSwaggerJsonFunc = (config: configObject) => Promise<swagger>

const fetchSwaggerJson: fetchSwaggerJsonFunc = async ({ url }) => {

  const spin = ora("Start fetch swagger url \r").start()

  try {

    const result = await fetch(url!)

    return spin.succeed("Success fetch Swagger url !") && await result.json()

  } catch (x) {

    spin.fail("Fetch swagger url fail.  Ovo")

    ERROR(`Unexpect error occured with url --- ${url}`)
  }

}

export default fetchSwaggerJson