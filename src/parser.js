import fs from 'fs'
import path from 'path'

export const parseJSON = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${filepath}`)
  }

  const data = fs.readFileSync(absolutePath, 'utf-8')
  return JSON.parse(data)
}
