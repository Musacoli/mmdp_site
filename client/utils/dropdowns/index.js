export const hasId = (item) => {
  return item._id !== undefined;
};

export const hasNoId = (item) => {
  return item._id === undefined;
};

export const filterDropdowns = (data, condition) => {
  return data.filter(condition);
};

export const checkEditedData = (
  editedData,
  errors,
  errorMessage,
  baseArray = [],
) => {
  return editedData.reduce((titleStore, data) => {
    const item = data;
    item.errors = data.errors ? data.errors : {};
    if (titleStore.indexOf(data.pillarTitle) !== -1) {
      item.errors.pillarTitle = errorMessage;
      errors.push(item.errors.thematicPillars);
    }
    titleStore.push(data.pillarTitle);
    return titleStore;
  }, baseArray);
};

export const getKeys = (objArray, key) => {
  return objArray.map((obj) => obj[key]);
};

export const checkEmptyField = (dropdowns, emptyDropdowns, errors) => {
  dropdowns.map((item) => {
    const data = item;
    if (data.pillarTitle.trim() === '' || data.pillarTitle === undefined) {
      data.errors = data.errors || {};
      data.errors.pillarTitle = 'Please enter a thematic pillar title';
      errors.push(data.errors.thematicPillars);
    }

    return emptyDropdowns.push(data);
  });
};

export const updateOrCreate = (func, editedData, addedData) => {
  if (editedData.length > 0) {
    func({ data: { data: editedData }, create: false });
  }
  if (addedData.length > 0) {
    func({ data: { data: addedData }, create: true });
  }
};
