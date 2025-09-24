import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import { parseFile } from '../src/parsers.js'
import { readFile } from '../src/fileUtils.js'
import { diff } from '../src/diff.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename =>
  path.join(__dirname, '..', '__fixtures__', filename)

const compareFiles = (file1, file2, expectedFile) => {
  const obj1 = parseFile(getFixturePath(file1))
  const obj2 = parseFile(getFixturePath(file2))
  const expected = readFile(getFixturePath(expectedFile))
  expect(diff(obj1, obj2)).toBe(expected)
}

describe('diff', () => {
  test('json vs json', () => {
    compareFiles('file1.json', 'file2.json', 'expected_json.txt')
  })

  test('yaml vs yaml', () => {
    compareFiles('file1.yaml', 'file2.yaml', 'expected_json.txt')
  })

  test('yml vs yml', () => {
    compareFiles('file1.yml', 'file2.yml', 'expected_json.txt')
  })

  test('json vs yaml', () => {
    compareFiles('file1.json', 'file2.yaml', 'expected_json.txt')
  })

  test('json vs yml', () => {
    compareFiles('file1.json', 'file2.yml', 'expected_json.txt')
  })

  test('yaml vs yml', () => {
    compareFiles('file1.yaml', 'file2.yml', 'expected_json.txt')
  })
})
