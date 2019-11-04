import {score} from './score'
import {duckTypeComponent} from '../../jest'

test('score should instantiate a component', () => {
  expect(duckTypeComponent(score(document.createElement('div')))).toBeTruthy()
})