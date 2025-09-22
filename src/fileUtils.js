import fs from 'fs'
import path from 'path'

export const getAbsolutePath = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${filepath}`)
  }
  return absolutePath
}

export const readFile = (absolutePath) => {
  return fs.readFileSync(absolutePath, 'utf-8')
}
