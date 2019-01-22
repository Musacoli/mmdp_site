export default {
  isNullOrUndefined(data) {
    return (typeof data === 'undefined'
      || !data && typeof data === 'object');
  },
  isString(data) {
    return typeof data === 'string';
  },
  isEmptyObject(obj) {
    if (!this.isObject(obj)) {
      return true;
    }
    return !Object.keys(obj).length;
  },
  isObject(obj) {
    return typeof obj === 'object';
  },
};
