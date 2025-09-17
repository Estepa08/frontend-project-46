import { parseJSON } from './parser.js'
import { diff } from './diff.js'

export const gendiff = (filepath1, filepath2) => {
  const obj1 = parseJSON(filepath1)
  const obj2 = parseJSON(filepath2)
  return { obj1, obj2, diff: diff(obj1, obj2) }
}

export { diff }
