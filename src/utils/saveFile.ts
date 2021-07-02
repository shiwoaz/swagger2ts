import path from 'path'
import fs from 'fs'
import { resAllPath } from './parsePath';
import { ERROR, SUCESS, WARNING } from './sdtout';

const filePath = path.join(process.cwd(), './dist/');

(
  function () {
    fs.stat(filePath, (err => {
      if (err) {
        WARNING("dist folder don't exit, create now")
        fs.mkdirSync(filePath)
        SUCESS(`${filePath} successfully created!`)
      }
    }))
  }
)()

console.log(filePath);

const saveType = (data: resAllPath[]) => {
  const Text = data.map(({ responseTypeText, requestTypeText }) => `
    ${requestTypeText}

    ${responseTypeText}
  `).join('')

  fs.writeFile(path.join(filePath, "type.d.ts"), Text, err => {
    if (err) {
      ERROR(`type file write failed  --> ${err}`)
    }
  })

}

const saveFunc = (data: string[]) => {

  fs.writeFile(path.join(filePath, 'service.ts'), data.join(''), err => {
    if (err) {
      ERROR(`function file write failed  --> ${err}`)
    }
  })
}

export { saveType, saveFunc }