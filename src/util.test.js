import {makePropject, clearElement} from './util'

test('makePropject should return an object', () => {
  expect(typeof makePropject({})).toBe('object')
})

test('makePropject result should be a valid Object.create properties object', () => {
  const foo = 23
  const proto = {}
  let valid = true
  try {
    Object.create(proto, makePropject({foo}))
  } catch (err) {
    valid = false
  }
  expect(valid).toBe(true)
})

test('clearElement should return parsed element', () => {
  const div = document.createElement('div')
  expect(clearElement(div)).toBe(div)
})

test('clearElement should remove HTMLElements', () => {
  const numChildren = 99
  const div = document.createElement('div')
  let i = numChildren
  while (i--) div.appendChild(document.createElement('div'))
  expect(div.children.length).toBe(numChildren)
  clearElement(div)
  expect(div.children.length).toBe(0)
})

test('clearElement should remove TextNodes', () => {
  const numChildren = 99
  const div = document.createElement('div')
  let i = numChildren
  while (i--) div.appendChild(document.createTextNode(i))
  expect(div.childNodes.length).toBe(numChildren)
  clearElement(div)
  expect(div.childNodes.length).toBe(0)
})