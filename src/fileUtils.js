import fs from 'fs'
import path from 'path'

export const getAbsolutePath = (filepath) => {
  let absolutePath = path.resolve(process.cwd(), filepath)
  if (fs.existsSync(absolutePath)) {
    return absolutePath
  }

  const examplesPath = path.resolve(process.cwd(), '__fixtures__', filepath)
  if (fs.existsSync(examplesPath)) {
    return examplesPath
  }

  throw new Error(
    `File not found: ${filepath}. Please make sure the file exists in current directory or in __fixtures__/examples/`,
  )
}

export const readFile = (absolutePath) => {
  return fs.readFileSync(absolutePath, 'utf-8')
}
