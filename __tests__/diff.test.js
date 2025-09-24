import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import { parseFile } from '../src/parsers.js'
import { readFile } from '../src/fileUtils.js'
import { diff } from '../src/diff.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename =>
  path.join(__dirname, '..', '__fixtures__', 'diff', filename)

const compareFiles = (file1, file2, expectedFile) => {
  const obj1 = parseFile(getFixturePath(file1))
  const obj2 = parseFile(getFixturePath(file2))
  const expected = readFile(getFixturePath(expectedFile))
  expect(diff(obj1, obj2)).toBe(expected)
}

describe('diff', () => {
  test('both objects are empty', () => {
    compareFiles('empty1.json', 'empty2.json', 'empty_result.txt')
  })

  test('key exists only in first object', () => {
    compareFiles('file1.json', 'file2.json', 'expected1.txt')
  })

  test('key exists only in second object', () => {
    compareFiles('file2.json', 'file1.json', 'expected2.txt')
  })

  test('key exists in both objects with same value', () => {
    compareFiles('file1.json', 'file1.json', 'expected3.txt')
  })

  test('key exists in both objects with different values', () => {
    compareFiles('file1.json', 'file3.json', 'expected4.txt')
  })

  describe('nested structures', () => {
    test('comparing complex nested structures', () => {
      compareFiles('filepath1.json', 'filepath2.json', 'expectedJSON.txt')
    })

    test('adding nested object', () => {
      compareFiles(
        'nested_before_add.json',
        'nested_after_add.json',
        'expected_nested_add.txt',
      )
    })

    test('removing nested object', () => {
      compareFiles(
        'nested_before_remove.json',
        'nested_after_remove.json',
        'expected_nested_remove.txt',
      )
    })

    test('changing nested value', () => {
      compareFiles(
        'nested_before_change.json',
        'nested_after_change.json',
        'expected_nested_change.txt',
      )
    })

    test('deeply nested structures (3+ levels)', () => {
      compareFiles(
        'deep_nested_1.json',
        'deep_nested_2.json',
        'expected_deep_nested.txt',
      )
    })
  })
})
