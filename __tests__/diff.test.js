import { readFileSync } from 'node:fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const getFixturePath = filename =>
  path.join(__dirname, '..', '__fixtures__', filename)

export const readFixtureFile = filename =>
  readFileSync(getFixturePath(filename), 'utf-8').trim()

const expectedDefault = readFixtureFile('expected_default.txt')
const expectedStylish = readFixtureFile('expected_stylish.txt')
const expectedPlain = readFixtureFile('expected_plain.txt')
const expectedJson = readFixtureFile('expected_json.txt')

describe('genDiff formats', () => {
  test('json type', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')
    expect(genDiff(filepath1, filepath2)).toBe(expectedDefault)
    expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expectedStylish)
    expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedPlain)
    expect(genDiff(filepath1, filepath2, 'json')).toBe(expectedJson)
  })

  test('yaml type', () => {
    const filepath1 = getFixturePath('file1.yaml')
    const filepath2 = getFixturePath('file2.yaml')
    expect(genDiff(filepath1, filepath2)).toBe(expectedDefault)
    expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expectedStylish)
    expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedPlain)
    expect(genDiff(filepath1, filepath2, 'json')).toBe(expectedJson)
  })

  test('yml type', () => {
    const filepath1 = getFixturePath('file1.yml')
    const filepath2 = getFixturePath('file2.yml')
    expect(genDiff(filepath1, filepath2)).toBe(expectedDefault)
    expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expectedStylish)
    expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedPlain)
    expect(genDiff(filepath1, filepath2, 'json')).toBe(expectedJson)
  })
})
