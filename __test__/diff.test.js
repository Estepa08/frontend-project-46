import { diff } from '../src/diff'

describe('diff', () => {
  test('оба объекта пустые', () => {
    const obj1 = {}
    const obj2 = {}
    const expected = `{\n\n}`
    expect(diff(obj1, obj2)).toBe(expected)
  })

  test('ключ только в первом объекте', () => {
    const obj1 = { a: 1 }
    const obj2 = {}
    const expected = `{\n  - a: 1\n}`
    expect(diff(obj1, obj2)).toBe(expected)
  })

  test('ключ только во втором объекте', () => {
    const obj1 = {}
    const obj2 = { a: 1 }
    const expected = `{\n  + a: 1\n}`
    expect(diff(obj1, obj2)).toBe(expected)
  })

  test('ключ в обоих объектах, значение одинаковое', () => {
    const obj1 = { a: 1 }
    const obj2 = { a: 1 }
    const expected = `{\n  a: 1\n}`
    expect(diff(obj1, obj2)).toBe(expected)
  })

  test('ключ в обоих объектах, значения разные', () => {
    const obj1 = { a: 1 }
    const obj2 = { a: 2 }
    const expected = `{\n  - a: 1\n  + a: 2\n}`
    expect(diff(obj1, obj2)).toBe(expected)
  })
})
