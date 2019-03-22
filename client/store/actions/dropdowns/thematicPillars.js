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

export const deletethematicPillar = (payload) => ({
  type: DELETE_THEMATIC_PILLAR,
  payload,
});

export const deleteThematicPillarSuccess = (payload) => ({
  type: DELETE_THEMATIC_PILLAR_SUCCESS,
  payload,
});

export const deleteThematicPillarFailure = (payload) => ({
  type: DELETE_THEMATIC_PILLAR_FAILURE,
  payload,
});

export const fetchThematicPillars = () => ({
  type: FETCH_THEMATIC_PILLARS,
});

export const fetchThematicPillarsSuccess = (payload) => ({
  type: FETCH_THEMATIC_PILLARS_SUCCESS,
  payload,
});

export const fetchThematicPillarsFailure = (payload) => ({
  type: FETCH_THEMATIC_PILLARS_FAILURE,
  payload,
});

export const addThematicPillar = (payload) => ({
  type: ADD_THEMATIC_PILLAR,
  payload,
});

export const addThematicPillarSuccess = (payload) => ({
  type: ADD_THEMATIC_PILLAR_SUCCESS,
  payload,
});

export const addThematicPillarFailure = (payload) => ({
  type: ADD_THEMATIC_PILLAR_FAILURE,
  payload,
});
