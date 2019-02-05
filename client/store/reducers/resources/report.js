import {
  ADD_REPORT,
  ADD_REPORT_SUCCESS,
  ADD_REPORT_FAILURE,
} from '../../../constants/resources/report';

const initialState = {
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_REPORT:
      return { ...state, loading: true, ...payload };
    case ADD_REPORT_SUCCESS:
      return { ...state, loading: false, ...payload };
    case ADD_REPORT_FAILURE:
      return { ...state, loading: false, ...payload };
    default:
      return state;
  }
};
