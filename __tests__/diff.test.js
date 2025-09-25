import { readFileSync } from 'node:fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import getDiff from '../src/diff.js'
import { parseFile } from '../src/index.js'
import formatter from '../src/formatter/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename =>
  path.join(__dirname, '..', '__fixtures__', filename)

const readFile = filename =>
  readFileSync(getFixturePath(filename), 'utf-8').trim()

const compareFiles = (file1, file2, format, expectedFile) => {
  const obj1 = parseFile(getFixturePath(file1))
  const obj2 = parseFile(getFixturePath(file2))
  const expected = readFile(expectedFile)
  expect(formatter(getDiff(obj1, obj2), format)).toBe(expected)
}

describe('difference', () => {
  test('check default format', () => {
    compareFiles('file1.json', 'file2.json', 'stylish', 'expected_default.txt')
    compareFiles('file1.yaml', 'file2.yaml', 'stylish', 'expected_default.txt')
    compareFiles('file1.yml', 'file2.yml', 'stylish', 'expected_default.txt')
  })

  test('check stylish format', () => {
    compareFiles('file1.json', 'file2.json', 'stylish', 'expected_stylish.txt')
    compareFiles('file1.yaml', 'file2.yaml', 'stylish', 'expected_stylish.txt')
    compareFiles('file1.yml', 'file2.yml', 'stylish', 'expected_stylish.txt')
  })

  test('check plain format', () => {
    compareFiles('file1.json', 'file2.json', 'plain', 'expected_plain.txt')
    compareFiles('file1.yaml', 'file2.yaml', 'plain', 'expected_plain.txt')
    compareFiles('file1.yml', 'file2.yml', 'plain', 'expected_plain.txt')
  })
})
