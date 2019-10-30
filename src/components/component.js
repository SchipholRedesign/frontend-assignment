/**
 * Base component factory
 * @name Component
 * @param {HTMLElement} _element
 * @param {Map} componentInstances
 * @param {Function} [_init]
 * @return {Component}
 */
export function component(_element, componentInstances, _init){
  return Object.create({
    /**
     * The component element
     * @memberof! Component#
     * @return {HTMLElement}
     */
    get element(){
      return _element
    },
    /**
     * Get the component instance of an element
     * @param {HTMLElement} element
     * @memberof! Component#
     * @return {Component}
     */
    getInstance(element) {
      return componentInstances.get(element)
    },
    /**
     * The component initialisation method
     * @memberof! Component#
     */
    init() {
      _init?.(this)
    }
  })
}

