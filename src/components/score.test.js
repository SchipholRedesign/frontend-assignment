import {score} from './score'
import {duckTypeComponent} from '../../test/jest'

test('score should instantiate a component', () => {
  expect(duckTypeComponent(score(document.createElement('div')))).toBeTruthy()
})