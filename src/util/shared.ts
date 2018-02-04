const toString = Object.prototype.toString
const getObjectType = x => toString.call(x).slice(8, -1)
const isObjectOfType = type => x => getObjectType(x) === type

export const isPlainObject = isObjectOfType('Object')

export const noop = () => void 0;
