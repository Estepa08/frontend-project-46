import _ from 'lodash'

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)))

  return keys.map((key) => {
    if (!_.has(data2, key)) {
      return { type: 'removed', key, value: data1[key] }
    }
    if (!_.has(data1, key)) {
      return { type: 'added', key, value: data2[key] }
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { type: 'nested', key, children: buildDiff(data1[key], data2[key]) }
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return { type: 'changed', key, oldValue: data1[key], newValue: data2[key] }
    }
    return { type: 'unchanged', key, value: data1[key] }
  })
}

const genDifference = (data1, data2) => buildDiff(data1, data2)

export default genDifference
