import {
  FETCH_COUNTRY,
  FETCH_COUNTRY_FAILURE,
  FETCH_COUNTRY_SUCCESS,
  ADD_COUNTRY,
  ADD_COUNTRY_SUCCESS,
  ADD_COUNTRY_FAILURE,
  DELETE_COUNTRY,
  DELETE_COUNTRY_SUCCESS,
  DELETE_COUNTRY_FAILURE,
} from '../../../constants';

export const initialState = {
  loading: false,
  data: [],
};

export const countryOptions = (data) => {
  const options = [];
  data.map((value) =>
    options.push({ value: value._id, text: value.countryName }),
  );
  return options;
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_COUNTRY:
    case ADD_COUNTRY:
    case DELETE_COUNTRY:
      return { ...state, ...payload, loading: true };
    case FETCH_COUNTRY_FAILURE:
    case ADD_COUNTRY_FAILURE:
    case DELETE_COUNTRY_FAILURE:
      return { ...state, ...payload, loading: false };

    case FETCH_COUNTRY_SUCCESS:
    case ADD_COUNTRY_SUCCESS:
    case DELETE_COUNTRY_SUCCESS:
      return { ...state, ...payload, loading: false };

    default:
      return state;
  }
};
