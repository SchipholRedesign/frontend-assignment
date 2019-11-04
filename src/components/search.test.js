import {search} from './search'
import {duckTypeComponent} from '../../test/jest'

test('search should instantiate a component', () => {
  expect(duckTypeComponent(search(document.createElement('div')))).toBeTruthy()
})