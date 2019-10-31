import {component} from './component'
import {makePropject} from '../util'

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
    if (this._bodyTr) {
      // console.log('this.instantiate',this._instantiate) // todo: remove log
      replaceTableBody(this._tbody, data, this._bodyTr)
      this._instantiate(this._tbody)
      // const tr = this._bodyTr.content
    } else {
      this._tbody.innerHTML = data.length
          &&flatMapBodyTR(data, this._propertyKeys).join('')
          ||this._emptybody
    }
  }
}, (element, componentInstances, instantiate) => {
  const _tbody = element.querySelector('tbody')
  const _emptybody = _tbody.innerHTML
  const _propertyKeys = [...element.querySelectorAll('thead>tr>th')].map(th=>th.dataset.key)
  const {template} = element.dataset
  const _bodyTr = template&&element.ownerDocument.querySelector(template)
  return makePropject({_tbody, _emptybody, _propertyKeys, _bodyTr})
})

function flatMapBodyTR(data, propertyKeys){
  return data.map(entry=>`<tr>
    ${propertyKeys.map(key=>`<td>${entry[key]}</td>`).join('')}
  </tr>`)
}

function replaceTableBody(tbody, data, template){
  while (tbody.firstChild) tbody.firstChild.remove()
	const fragment = document.createDocumentFragment()
  data.forEach(item=>{
    const tr = document.importNode(template.content, true);
    ;[...tr.querySelectorAll('[data-content]')].forEach(elm=>{
      elm.textContent = item[elm.dataset.content]
    })
    ;[...tr.querySelectorAll('[data-attr]')].forEach(elm=>{
      elm.dataset[elm.dataset.attr] = item[elm.dataset.attr]
    })
    fragment.appendChild(tr)
  })
  tbody.appendChild(fragment)

}