import { configObject } from "./type";
import genCode from "./utils/gen";
import parsePath from "./utils/parsePath";
import fetchSwaggerJson from "./utils/request";
import { ERROR, WARNING } from "./utils/sdtout";
import separate from "./utils/sparate";

const HELPTXT = `
  swagger2ts is a tool for generating TypeScript service code from swagger

  [GITHUB]: https://github.com/shiwoaz/swagger2ts

  ts-node src/index.ts [options]=[value]

  url                    Swagger url

  ( i.e ts-node src/index.ts url=http://10.1.1.1/swagger/%E8%B/swagger.json )
`;

(function () {

  const params = process.argv.slice(2)

  if (params.length === 0) {
    process.stdout.write(HELPTXT)
    process.exit(0);
  }

  const config: configObject = {
    url: undefined
  }

  params.forEach(item => {
    const [name, value] = separate(item)

    switch (name) {
      case "url":
        config.url = value
        break;

      default:
        WARNING(`${name} ------- ${value}`)
        break
    }
  })

  const { url } = config

  if (!url) {
    ERROR(`Miss require params "url"`)
  }


  fetchSwaggerJson(config).then(({ paths, components }) => {

    const allPath = parsePath(paths, components)

    console.log(allPath);

    genCode(allPath)
  })



})();

