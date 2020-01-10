export const HasOwnProperty = (obj = {}, ...attrs) => Object.prototype.hasOwnProperty.call(obj, ...attrs);
