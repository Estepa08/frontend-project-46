import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import { gendiff } from '../src/index.js'
import { readFile } from '../src/fileUtils.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename =>
  path.join(__dirname, '..', '__fixtures__', 'gendiff', filename)

const compareFiles = (file1Path, file2Path, expectedPath) => {
  const file1 = getFixturePath(file1Path)
  const file2 = getFixturePath(file2Path)
  const expected = readFile(getFixturePath(expectedPath))

  expect(gendiff(file1, file2).diff).toBe(expected)
}

const expectError = (file1Path, file2Path, errorMessage) => {
  const file1 = getFixturePath(file1Path)
  const file2 = getFixturePath(file2Path)

  expect(() => gendiff(file1, file2)).toThrow(errorMessage)
}

describe('gendiff (integration)', () => {
  describe('successful comparisons', () => {
    test('compare JSON files', () => {
      compareFiles('test_file1.json', 'test_file2.json', 'expected_json.txt')
    })

    test('compare YML files', () => {
      compareFiles('test_file1.yml', 'test_file2.yml', 'expected_yaml.txt')
    })

    test('compare YAML files', () => {
      compareFiles('test_file1.yaml', 'test_file2.yaml', 'expected_yaml.txt')
    })

    test('compare JSON vs YAML', () => {
      compareFiles('test_file1.json', 'test_file2.yaml', 'expected_yaml.txt')
    })

    test('compare JSON vs YML', () => {
      compareFiles('test_file1.json', 'test_file2.yml', 'expected_yaml.txt')
    })

    test('compare YML vs YAML', () => {
      compareFiles('test_file1.yml', 'test_file2.yaml', 'expected_yaml.txt')
    })
  })

  describe('error handling', () => {
    test('error on unsupported file format', () => {
      expectError('file1.txt', 'file2.txt', 'Unsupported file format')
    })

    test('error on file not found', () => {
      expectError('not_exist.json', 'file2.json', 'File not found')
    })
  })
})
