import yaml from 'js-yaml'

const parser = (filepath, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(filepath)
    case 'yaml':
      return yaml.load(filepath)
    case 'yml':
      return yaml.load(filepath)
    default:
      throw new Error(`Unknown format: ${format}`)
  }
}
export default parser
