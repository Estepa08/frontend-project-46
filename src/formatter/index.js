import stylish from './stylish.js'
import plain from './plain.js'

const formatter = (dataFile, formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return stylish(dataFile)
    case 'plain':
      return plain(dataFile)
    default:
      throw new Error(
        `Unknown format: ${formatName} , please check the documentation.`,
      )
  }
}
export default formatter
