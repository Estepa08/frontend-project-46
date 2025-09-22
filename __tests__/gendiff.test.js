import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import { gendiff } from '../src/index.js'
import { readFile } from '../src/fileUtils.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename =>
  path.join(__dirname, '..', '__fixtures__', filename)

describe('gendiff (integration)', () => {
  test('compare JSON files', () => {
    const file1 = getFixturePath('test_file1.json')
    const file2 = getFixturePath('test_file2.json')
    const expected = readFile(getFixturePath('expected_json.txt'))

    expect(gendiff(file1, file2).diff).toBe(expected)
  })

  test('compare YAML files', () => {
    const file1 = getFixturePath('test_file1.yml')
    const file2 = getFixturePath('test_file2.yml')
    const expected = readFile(getFixturePath('expected_yaml.txt'))

    expect(gendiff(file1, file2).diff).toBe(expected)
  })

  test('error on unsupported file format', () => {
    const file1 = getFixturePath('file1.txt')
    const file2 = getFixturePath('file2.txt')

    expect(() => gendiff(file1, file2)).toThrow('Unsupported file format')
  })

  test('error on file not found', () => {
    const file1 = getFixturePath('not_exist.json')
    const file2 = getFixturePath('file2.json')

    expect(() => gendiff(file1, file2)).toThrow('File not found')
  })
})
