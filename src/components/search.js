import {component} from './component'

/**
 * A search component
 * @param element
 * @param componentInstances
 * @return {Component}
 */
export const search = component(null,()=>({_value:{ value: '', writable: true, enumerable: false, configurable: false }})).loaded(inst=>{
  const {element} = inst
  const {endpoint, targetSelector} = element.dataset
  const targetInstance = inst.getInstance(document.querySelector(targetSelector))
  const boundChange = onInputChange.bind(null, inst, endpoint, targetInstance)
  ;['change', 'input'].forEach(event=>element.addEventListener(event, boundChange))
})

/**
 * Bound event listener for querying server
 * @param {Component} inst
 * @param {string} endpoint
 * @param {Component} targetInstance
 * @param {Event} e
 */
function onInputChange(inst, endpoint, targetInstance, e){
  const {target:{value,value:{length}}} = e
  if (inst._value!==value) {
    inst._value = value
    length>2
      && fetch(endpoint+value)
          .then(res=>res.json())
          .then(data=>targetInstance.populate(data))
      || targetInstance.populate([])
  }
}