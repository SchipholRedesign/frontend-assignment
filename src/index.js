import '../sass/index.scss'

import {search} from './components/search'
import {table} from './components/table'
import {score} from './components/score'

const components = {search, table, score}
const componentInstances = new Map()

window.addEventListener('load', onDocumentLoad)

/**
 * Initialise components when document loads
 */
function onDocumentLoad(){
  instantiateComponents(document)
}

/**
 * Instantiate components from a root element
 * @param root
 */
function instantiateComponents(root) {
  [...root.querySelectorAll('[data-component]')].map(element=>{
    const type = element.dataset.component
    const instance = components[type](element, componentInstances, instantiateComponents)
    componentInstances.set(element, instance)
    return instance
  })
      .map(instance=>instance.loaded())
  // check for orphaned instances
  componentInstances.forEach((inst, elm)=>{
    if (document.body.contains(elm)) {
      componentInstances.delete(elm)
      inst.destroy?.()
    }
  })
}