import {component} from './component'
import {clearElement, makePropject} from '../util'

/**
 * A generic table component
 * @name TableComponent
 * @param {HTMLTableElement} element
 * @param {Map} componentInstances
 * @extends Component
 * @return {TableComponent}
 */
export const table = component({
  /**
   * Populate the tbody
   * @param {Array} data
   * @memberof TableComponent#
   */
  populate(data){
    const {_tbody, _bodyTr, _emptybody} = this
    if (data.length) {
      _bodyTr
        && populateByTemplate(_tbody, data, _bodyTr)
        || populateByKeys(_tbody, data, this._propertyKeys)
      this._instantiate(_tbody)
    } else {
      _emptybody && !_tbody.contains(_emptybody) && clearElement(_tbody).appendChild(_emptybody)
    }
  }
}, (element/*, componentInstances, instantiate*/) => {
  const _tbody = element.querySelector('tbody')
  const _emptybody = _tbody.children[0]
  const _propertyKeys = [...element.querySelectorAll('thead>tr>th')].map(th=>th.dataset.key).filter(o=>o)
  const {template} = element.dataset
  const _bodyTr = template&&element.ownerDocument.querySelector(template)
  return makePropject({_tbody, _emptybody, _propertyKeys, _bodyTr})
})

/**
 * Populate body with data reference from thead>tr>th[data-key].
 * If no keys are set it will default to all the data values.
 * @param {HTMLElement} tbody
 * @param {object} data
 * @param {string[]} propertyKeys
 * @return {HTMLElement}
 */
function populateByKeys(tbody, data, propertyKeys){
  propertyKeys.length===0&&propertyKeys.push(...Object.keys(data?.[0]))
  const fragment = document.createDocumentFragment()
  data.forEach(entry=>{
    const tr = document.createElement('tr')
    propertyKeys.forEach(key=>{
      const td = document.createElement('td')
      td.innerText = entry[key]
      tr.appendChild(td)
    })
    fragment.appendChild(tr)
  })
  clearElement(tbody).appendChild(fragment)
  return tbody
}

/**
 *
 * @param {HTMLElement} tbody
 * @param {object} data
 * @param {HTMLTemplateElement} template
 * @return {HTMLElement}
 */
function populateByTemplate(tbody, data, template){
  clearElement(tbody)
	const fragment = document.createDocumentFragment()
  data.forEach(item=>{
    const tr = document.importNode(template.content, true)
    ;[...tr.querySelectorAll('[data-content]')].forEach(elm=>{
      elm.textContent = item[elm.dataset.content]
    })
    ;[...tr.querySelectorAll('[data-attr]')].forEach(elm=>{
      elm.dataset[elm.dataset.attr] = item[elm.dataset.attr]
    })
    fragment.appendChild(tr)
  })
  tbody.appendChild(fragment)
  return tbody
}