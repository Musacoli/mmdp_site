import {
  ADD_THEMATIC_PILLAR,
  ADD_THEMATIC_PILLAR_FAILURE,
  ADD_THEMATIC_PILLAR_SUCCESS,
  FETCH_THEMATIC_PILLARS,
  FETCH_THEMATIC_PILLARS_FAILURE,
  FETCH_THEMATIC_PILLARS_SUCCESS,
  DELETE_THEMATIC_PILLAR,
  DELETE_THEMATIC_PILLAR_FAILURE,
  DELETE_THEMATIC_PILLAR_SUCCESS,
} from '../../../constants/dropdowns/thematicPillars';

export const initialState = {
  data: [],
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_THEMATIC_PILLAR:
      return { loading: true };
    case ADD_THEMATIC_PILLAR_FAILURE:
      return { ...state, ...payload, loading: false };
    case ADD_THEMATIC_PILLAR_SUCCESS:
      return { ...state, ...payload, loading: false };

    case DELETE_THEMATIC_PILLAR:
      return { ...state, ...payload, loading: true };
    case DELETE_THEMATIC_PILLAR_FAILURE:
      return { ...state, ...payload, loading: false };
    case DELETE_THEMATIC_PILLAR_SUCCESS:
      return { ...state, ...payload, loading: false };

    case FETCH_THEMATIC_PILLARS:
      return { ...state, ...payload, loading: true };
    case FETCH_THEMATIC_PILLARS_SUCCESS:
      return { ...state, ...payload, loading: false };
    case FETCH_THEMATIC_PILLARS_FAILURE:
      return { ...state, ...payload, loading: false };
    default:
      return state;
  }
};
