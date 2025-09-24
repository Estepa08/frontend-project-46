const formatValue = (value) => {
  if (value === null) return 'null'
  if (typeof value === 'object') return '[complex value]'
  return typeof value === 'string' ? `'${value}'` : String(value)
}

const makePath = (path, key) => (path ? `${path}.${key}` : key)

const formatNode = (node, path) => {
  const { type, key, value, oldValue, newValue, children } = node
  const currentPath = makePath(path, key)

  switch (type) {
    case 'added':
      return `Property '${currentPath}' was added with value: ${formatValue(value)}`
    case 'removed':
      return `Property '${currentPath}' was removed`
    case 'changed':
      return `Property '${currentPath}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`
    case 'nested':
      return plain(children, currentPath)
    case 'unchanged':
      return null
    default:
      throw new Error(`Unknown node type: ${type}`)
  }
}

export const plain = (tree, path = '') => {
  const lines = tree.map(node => formatNode(node, path)).filter(Boolean)
  return lines.join('\n')
}

export default plain
