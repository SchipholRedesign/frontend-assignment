import {component} from './component'

/**
 * A generic table component
 * @name TableComponent
 * @param {HTMLTableElement} element
 * @param {Map} componentInstances
 * @extends Component
 * @return {TableComponent}
 */
export function table(element, componentInstances){
  let tbody, emptybody
  let propertyKeys = []
  return Object.create(Object.assign({
    /**
     * Populate the tbody
     * @param {Array} data
     * @memberof TableComponent#
     */
    populate(data){
      tbody.innerHTML = data.length&&data.map(entry=>`<tr>
        ${propertyKeys.map(key=>`<td>${entry[key]}</td>`).join('')}
      </tr>`).join('')||emptybody
    }
  }, Object.getPrototypeOf(component(element, componentInstances, inst=>{
    tbody = inst.element.querySelector('tbody')
    emptybody = tbody.innerHTML
    propertyKeys.push(...[...inst.element.querySelectorAll('thead>tr>th')].map(th=>th.dataset.key))
  }))))
}