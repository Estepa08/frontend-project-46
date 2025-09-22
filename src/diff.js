export const diff = (obj1, obj2) => {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])]
    .sort((a, b) => a.localeCompare(b))

  const lines = keys.map((key) => {
    if (!Object.hasOwn(obj2, key)) {
      return `  - ${key}: ${obj1[key]}`
    }
    if (!Object.hasOwn(obj1, key)) {
      return `  + ${key}: ${obj2[key]}`
    }
    if (obj1[key] !== obj2[key]) {
      return [
        `  - ${key}: ${obj1[key]}`,
        `  + ${key}: ${obj2[key]}`,
      ].join('\n')
    }
    return `  ${key}: ${obj1[key]}`
  })

  return `{\n${lines.join('\n')}\n}`
}
