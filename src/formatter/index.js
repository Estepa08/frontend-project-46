import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

const formatter = (dataFile, formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return stylish(dataFile)
    case 'plain':
      return plain(dataFile)
    case 'json':
      return json(dataFile)
    default:
      throw new Error(
        `Unknown format: ${formatName} , please check the documentation.`,
      )
  }
}
export default formatter
