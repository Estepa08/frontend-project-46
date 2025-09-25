import _ from 'lodash'

const spacesPerLevel = 4
const leftShift = 2

const makeIndent = (depth, withShift = false) => {
  const indentSize = depth * spacesPerLevel - (withShift ? leftShift : 0)
  return ' '.repeat(indentSize)
}

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data)
  }

  const entries = _.entries(data).map(
    ([key, value]) =>
      `${makeIndent(depth + 1)}${key}: ${stringify(value, depth + 1)}`,
  )

  return `{\n${entries.join('\n')}\n${makeIndent(depth)}}`
}

const formatTree = (tree, depth = 1) =>
  tree.map((node) => {
    switch (node.type) {
      case 'added':
        return `${makeIndent(depth, true)}+ ${node.key}: ${stringify(node.value, depth)}`
      case 'removed':
        return `${makeIndent(depth, true)}- ${node.key}: ${stringify(node.value, depth)}`
      case 'changed':
        return [
          `${makeIndent(depth, true)}- ${node.key}: ${stringify(node.oldValue, depth)}`,
          `${makeIndent(depth, true)}+ ${node.key}: ${stringify(node.newValue, depth)}`,
        ].join('\n')
      case 'nested': {
        const children = formatTree(node.children, depth + 1).join('\n')
        return `${makeIndent(depth)}${node.key}: {\n${children}\n${makeIndent(depth)}}`
      }
      case 'unchanged':
        return `${makeIndent(depth)}${node.key}: ${stringify(node.value, depth)}`
      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  })

const stylish = tree => `{\n${formatTree(tree).join('\n')}\n}`

export default stylish
