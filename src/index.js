import '../sass/index.scss'

import {search} from './components/search'
import {table} from './components/table'

const components = {search, table}
const componentInstances = new Map()

window.addEventListener('load', onDocumentLoad);

/**
 * Initialise components when document loads
 */
function onDocumentLoad(){
  [...document.querySelectorAll('[data-component]')].map(element=>{
    const type = element.dataset.component;
    const instance = components[type](element, componentInstances);
    componentInstances.set(element, instance);
    return instance
  }).map(instance=>instance.init(instance));
}

