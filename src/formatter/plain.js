const isObject = value =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const stringify = (value) => {
  if (isObject(value)) return '[complex value]'
  if (typeof value === 'string') return `'${value}'`
  return String(value)
}

const formatTree = (tree, path = '') =>
  tree
    .filter(({ type }) => type !== 'unchanged')
    .map((node) => {
      switch (node.type) {
        case 'added':
          return `Property '${path}${node.key}' was added with value: ${stringify(node.value)}`
        case 'changed':
          return `Property '${path}${node.key}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`
        case 'nested':
          return formatTree(node.children, `${path}${node.key}.`)
        case 'removed':
          return `Property '${path}${node.key}' was removed`
        default:
          throw new Error(`Unknown node type: ${node.type}`)
      }
    })
    .join('\n')

const plain = tree => formatTree(tree)

export default plain
