import path from 'node:path'
import { readFileSync } from 'node:fs'

import parser from './parsers.js'
import genDifference from './diff.js'
import formatter from './formatter/index.js'

const getFullPath = filepath => path.resolve(process.cwd(), '__fixtures__', filepath)
const getFormat = filepath => path.extname(filepath).slice(1)

export const getData = filepath =>
  parser(readFileSync(getFullPath(filepath), 'utf-8'), getFormat(filepath))

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1)
  const data2 = getData(filepath2)

  const difference = genDifference(data1, data2)
  return formatter(difference, formatName)
}

export default genDiff
