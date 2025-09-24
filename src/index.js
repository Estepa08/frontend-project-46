import { parseFile } from './parsers.js'
import { diff } from './diff.js'

export const gendiff = (filepath1, filepath2, formatName) => {
  const obj1 = parseFile(filepath1)
  const obj2 = parseFile(filepath2)

  return { obj1, obj2, diff: diff(obj1, obj2, formatName) }
}

export { diff }
