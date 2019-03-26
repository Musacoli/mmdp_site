import {
  ADD_COMMUNITIES,
  ADD_COMMUNITIES_FAILURE,
  ADD_COMMUNITIES_SUCCESS,
  FETCH_COMMUNITIES,
  FETCH_COMMUNITIES_FAILURE,
  FETCH_COMMUNITIES_SUCCESS,
  DELETE_COMMUNITY,
  DELETE_COMMUNITY_FAILURE,
  DELETE_COMMUNITY_SUCCESS,
} from '../../../constants';

export const initialState = {
  data: [],
  loading: false,
  isFetched: false,
  isDeleted: false,
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_COMMUNITIES:
      return { ...state, ...payload, loading: true };
    case ADD_COMMUNITIES_FAILURE:
      return { ...state, ...payload, loading: false };
    case ADD_COMMUNITIES_SUCCESS:
      return { ...state, ...payload, loading: false };

    case DELETE_COMMUNITY:
      return { ...state, ...payload, loading: true, isDeleted: false };
    case DELETE_COMMUNITY_FAILURE:
      return { ...state, ...payload, loading: false, isDeleted: false };
    case DELETE_COMMUNITY_SUCCESS:
      return { ...state, ...payload, loading: false, isDeleted: true };

    case FETCH_COMMUNITIES:
      return { ...state, ...payload, loading: true, isFetched: false };
    case FETCH_COMMUNITIES_SUCCESS:
      return { ...state, ...payload, loading: false, isFetched: true };
    case FETCH_COMMUNITIES_FAILURE:
      return { ...state, ...payload, loading: false, isFetched: false };
    default:
      return state;
  }
};
