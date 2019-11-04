import {table} from './table'
import {duckTypeComponent} from '../../jest'

test('table should instantiate a component', () => {
  const elmTable = document.createElement('table')
  elmTable.appendChild(document.createElement('tbody'))
  expect(duckTypeComponent(table(elmTable))).toBeTruthy()
})