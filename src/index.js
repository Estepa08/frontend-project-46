import parser from './parsers.js'
import { readFileSync } from 'node:fs'
import getDiff from './diff.js'
import formatter from './formatter/index.js'
import path from 'path'

const resolvePath = filepath => path.resolve(process.cwd(), filepath)

const getFormat = filepath => path.extname(filepath).slice(1)

const parseFile = filepath =>
  parser(readFileSync(resolvePath(filepath), 'utf-8'), getFormat(filepath))

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = parseFile(filepath1)
  const obj2 = parseFile(filepath2)

  const difference = getDiff(obj1, obj2)
  return formatter(difference, formatName)
}

export default gendiff
