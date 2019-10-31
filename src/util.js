const propProps =  { value: null, writable: false, enumerable: false, configurable: false }

/**
 * Expand key/value pairs into a properties object
 * @param {Object} obj
 * @return {{}}
 */
export function makePropject(obj){
  return Object.entries(obj).reduce((acc, [key, value])=>{
    acc[key] = {...propProps, value}
    return acc
  }, {})
}