const isObject = value =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const buildDiff = (obj1, obj2) => {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort(
    (a, b) => a.localeCompare(b),
  )

  return keys.map((key) => {
    if (!Object.hasOwn(obj2, key)) {
      return { type: 'removed', key, value: obj1[key] }
    }
    if (!Object.hasOwn(obj1, key)) {
      return { type: 'added', key, value: obj2[key] }
    }
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return { type: 'nested', key, children: buildDiff(obj1[key], obj2[key]) }
    }
    if (obj1[key] !== obj2[key]) {
      return { type: 'changed', key, oldValue: obj1[key], newValue: obj2[key] }
    }
    return { type: 'unchanged', key, value: obj1[key] }
  })
}

const getDiff = (obj1, obj2) => buildDiff(obj1, obj2)

export default getDiff
