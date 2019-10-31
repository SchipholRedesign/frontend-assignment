import {component} from './component'

/**
 * A score component
 * @param element
 * @param componentInstances
 * @return {Component}
 */
export const score = component(null, element=>{
  element.textContent = Math.round(parseFloat(element.dataset.score))
})