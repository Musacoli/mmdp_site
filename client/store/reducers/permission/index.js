import { FETCHING_PERMISSIONS, FETCH_PERMISSIONS } from '../../../constants';

export const initialState = {
  permissions: [],
  isFetching: false,
  options: [],
};

export const permissionOptions = (permissions) => {
  const options = [];
  permissions.map((value) =>
    options.push({ value: Object.keys(value), label: Object.values(value) }),
  );
  return options;
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCHING_PERMISSIONS:
      return { ...state, ...payload, isFetching: true };

    case FETCH_PERMISSIONS: {
      const options = permissionOptions(payload);
      return {
        ...state,
        permissions: payload,
        options,
        isFetching: false,
      };
    }

    default:
      return state;
  }
};
