export const hasId = (item) => {
  return item._id !== undefined;
};

export const hasNoId = (item) => {
  return item._id === undefined;
};

export const filterDropdowns = (data, condition) => {
  return data.filter(condition);
};
