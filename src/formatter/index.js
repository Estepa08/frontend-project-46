import { stylish } from './stylish.js'
import { plain } from './plain.js'

const formatters = {
  stylish,
  plain,
}

export const format = (diff, formatName = 'stylish') => {
  const formatter = formatters[formatName]
  if (!formatter) {
    throw new Error(
      `Unknown format: ${formatName}. Available formats: ${Object.keys(
        formatters,
      ).join(', ')}`,
    )
  }
  return formatter(diff)
}

export default format
