import path, { dirname } from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

import { diff } from '../src/diff'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename =>
  path.join(__dirname, '..', '__fixtures__', filename)

const readFile = filename =>
  fs.readFileSync(getFixturePath(filename), 'utf-8')

const readJson = filename => JSON.parse(readFile(filename))

const compareFiles = (file1, file2, expectedFile) => {
  const obj1 = readJson(file1)
  const obj2 = readJson(file2)
  const expected = readFile(expectedFile)
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
})
