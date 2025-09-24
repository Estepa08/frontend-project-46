const formatValue = (value, depth = 1) => {
  if (typeof value !== 'object' || value === null) {
    return String(value)
  }

  const indent = ' '.repeat(depth * 4)
  const bracketIndent = ' '.repeat((depth - 1) * 4)

  const lines = Object.entries(value).map(
    ([key, val]) => `${indent}${key}: ${formatValue(val, depth + 1)}`,
  )

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

export const stylish = (tree, depth = 1) => {
  const indent = (sign = ' ') => ' '.repeat(depth * 4 - 2) + sign + ' '

  const lines = tree.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent('+')}${node.key}: ${formatValue(node.value, depth + 1)}`
      case 'removed':
        return `${indent('-')}${node.key}: ${formatValue(node.value, depth + 1)}`
      case 'unchanged':
        return `${indent(' ')}${node.key}: ${formatValue(node.value, depth + 1)}`
      case 'changed':
        return [
          `${indent('-')}${node.key}: ${formatValue(node.oldValue, depth + 1)}`,
          `${indent('+')}${node.key}: ${formatValue(node.newValue, depth + 1)}`,
        ].join('\n')
      case 'nested':
        return `${indent(' ')}${node.key}: ${stylish(node.children, depth + 1)}`

      default:
        throw new Error(`Unknown type: ${node.type}`)
    }
  })
  return `{\n${lines.join('\n')}\n${' '.repeat((depth - 1) * 4)}}`
}
