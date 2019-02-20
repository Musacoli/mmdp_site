import * as types from '../../../constants/resources/Stakeholders';

const initialState = {
  loading: false,
  stakeholdersLoading: true,
  payload: [],
  payload2: [],
  stakeholders: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_ALL_NIGERIAN_LGAS:
    case types.GET_ALL_NIGERIAN_STATES:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_STAKEHOLDERS:
      return {
        ...state,
        stakeholdersLoading: true,
      };

    case types.GET_ALL_NIGERIAN_STATES_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        loading: false,
      };

    case types.GET_ALL_NIGERIAN_LGAS_SUCCESS:
      return {
        ...state,
        payload2: action.payload,
        loading: false,
      };

    case types.FETCH_STAKEHOLDERS_SUCCESS:
      return {
        ...state,
        stakeholdersLoading: false,
        stakeholders: action.payload,
      };

    case types.GET_ALL_NIGERIAN_STATES_FAILURE:
    case types.GET_ALL_NIGERIAN_LGAS_FAILURE:
    case types.FETCH_STAKEHOLDERS_FAILURE:
      return {
        ...state,
        responseMessage: action.payload,
        loading: false,
        stakeholdersLoading: false,
      };

    default:
      return state;
  }
};
