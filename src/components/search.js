import {component} from './component'

/**
 * A search component
 * @param element
 * @param componentInstances
 * @return {Component}
 */
export function search(element, componentInstances){
  return component(element, componentInstances, /** @param {Component} inst */ inst => {
    const {element, getInstance} = inst;
    const {endpoint, targetSelector} = element.dataset;
    const targetInstance = getInstance(document.querySelector(targetSelector))
    const boundChange = onInputChange.bind(null, endpoint, targetInstance);
    ['change', 'input'].forEach(event=>element.addEventListener(event, boundChange))
  });
}

/**
 * Bound eventlistener for querying server
 * @param {string} endpoint
 * @param {Component} targetInstance
 * @param {Event} e
 */
function onInputChange(endpoint, targetInstance, e){
  const {target:{value,value:{length}}} = e
  length>2
    && fetch(endpoint+value)
        .then(res=>res.json())
        .then(data=>targetInstance.populate(data))
    || targetInstance.populate([])
}