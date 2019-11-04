import {makePropject} from '../util'

/**
 * Base component
 * @name Component
 */

/**
 * Base component factory
 * @param {HTMLElement} _element
 * @param {Map} _componentInstances
 * @param {Object} [_proto]
 * @param {Object} [_props]
 * @return {Component}
 */
function componentFactory(_element, _componentInstances, _proto, _props){
  return Object.seal(Object.create(_proto||proto, {
    _loaded: { value: null, writable: true, enumerable: false, configurable: false }
    , ...makePropject({_element, _componentInstances})
    , ...(_props||{})
  }))
}

/**
 * Create an extended component prototype and return something
 * @param {Object} _proto
 * @param {Function} create A constructor function that may return an Array of properties
 * @return {Function}
 */
export function component(_proto, create) {
  // inline base prototype for getter declaration
  const proto = {
    /**
     * The component element
     * @memberof! Component#
     * @return {HTMLElement}
     */
    get element() {
      return this._element
    },/**
     * Get the component instance of an element
     * @param {HTMLElement} element
     * @memberof! Component#
     * @return {Component}
     */
    getInstance(element) {
      return this._componentInstances.get(element)
    },/**
     * The component initialisation method
     * @memberof! Component#
     */
    loaded(method) {
      method && (this._loaded = method) || this._loaded?.(this)
      return this
    },...(_proto || {})
  }
  // onloaded
  let loadedCallback;
  const instantiateComponent = (_element, _componentInstances, _instantiate) => {
    proto._instantiate = _instantiate
    return componentFactory(
        _element
        , _componentInstances
        , proto
        , create?.(_element, _componentInstances)
    ).loaded(loadedCallback)
  }
  return Object.assign(instantiateComponent, {
    loaded: cb=>(loadedCallback=cb, instantiateComponent)
  })
}