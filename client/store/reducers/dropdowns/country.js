import {
  FETCH_COUNTRY,
  FETCH_COUNTRY_FAILURE,
  FETCH_COUNTRY_SUCCESS,
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
      return { ...state, ...payload, loading: true };
    case FETCH_COUNTRY_FAILURE:
      return { ...state, ...payload, loading: false };
    case FETCH_COUNTRY_SUCCESS: {
      const options = payload ? payload.data : [];
      const data = countryOptions(options);
      return { ...state, data, loading: false };
    }

    default:
      return state;
  }
};
