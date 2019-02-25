import * as types from '../../../constants/resources/Stakeholders';

export const getNigerianStates = (payload) => ({
  type: types.GET_ALL_NIGERIAN_STATES,
  payload,
});

export const getNigerianStatesFailure = (payload) => ({
  type: types.GET_ALL_NIGERIAN_STATES_FAILURE,
  payload,
});

export const getNigerianStatesSucessful = (payload) => ({
  type: types.GET_ALL_NIGERIAN_STATES_SUCCESS,
  payload,
});

export const getNigerianStateLGAS = (payload) => ({
  type: types.GET_ALL_NIGERIAN_LGAS,
  payload,
});

export const getNigerianStateLGASSucess = (payload) => ({
  type: types.GET_ALL_NIGERIAN_LGAS_SUCCESS,
  payload,
});

export const getNigerianStateLGASFailure = (payload) => ({
  type: types.GET_ALL_NIGERIAN_LGAS_FAILURE,
  payload,
});

export const searchStakeHolders = (payload) => ({
  type: types.FETCH_STAKEHOLDERS,
  payload,
});

export const searchStakeHoldersSucess = (payload) => ({
  type: types.FETCH_STAKEHOLDERS_SUCCESS,
  payload,
});

export const searchStakeHoldersFailure = (payload) => ({
  type: types.FETCH_STAKEHOLDERS_FAILURE,
  payload,
});

export const filterSearchResults = (state) => ({
  type: types.FILTER_SEARCH_RESULTS,
  state,
});

export const filterSearchResultsUpdate = (state) => ({
  type: types.FILTER_SEARCH_RESULTS_UPDATE,
  filterStatus: state,
});
