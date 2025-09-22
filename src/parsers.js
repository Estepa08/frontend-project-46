import yaml from 'js-yaml'
import path from 'path'
import { getAbsolutePath, readFile } from './fileUtils.js'

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
}

export const parseFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath)
  const extname = path.extname(filepath)
  const parse = parsers[extname]

  if (!parse) {
    throw new Error(`Unsupported file format: ${extname}`)
  }

  const rawData = readFile(absolutePath)
  return parse(rawData)
}
