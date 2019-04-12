const collectMaps = (mObject) => {
  let result = null;
  if (mObject instanceof Array) {
    for (let i = 0; i < mObject.length; i++) {
      result = collectMaps(mObject[i]);
      if (result) {
        break;
      }
    }
  } else {
    for (const prop in mObject) {
      if (prop === 'attributes') {
        if (
          mObject[prop] &&
          mObject[prop].id &&
          mObject[prop].id === 'State Boundary'
        ) {
          return mObject.children;
        }
      }
      if (mObject[prop] instanceof Object || mObject[prop] instanceof Array) {
        result = collectMaps(mObject[prop]);
        if (result) {
          break;
        }
      }
    }
  }
  return result;
};
export default collectMaps;
