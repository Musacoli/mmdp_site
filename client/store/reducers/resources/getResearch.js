/* eslint-disable no-multi-assign */
import _ from 'underscore';
import {
  GET_USER_RESEARCH,
  GET_USER_RESEARCH_SUCCESS,
  GET_USER_RESEARCH_FAILURE,
  DELETE_USER_RESEARCH,
  DELETE_USER_RESEARCH_SUCCESS,
  DELETE_USER_RESEARCH_FAILURE,
  ARCHIVE_USER_RESEARCH,
  ARCHIVE_USER_RESEARCH_SUCCESS,
  ARCHIVE_USER_RESEARCH_FAILURE,
} from '../../../constants/resources/research';

/**
 * @param {Object} state - Default application state
 * @param {Object} action - Action from action creator
 * @returns {Object} New state
 */
const initialState = {
  loading: false,
};

function updateArchivedItem(arr, id, archiveStatus) {
  const archiveItem = _.findWhere(arr, { _id: id });
  const archived = (archiveItem.archived = archiveStatus);
  return archived;
}

const getResearchReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USER_RESEARCH:
    case ARCHIVE_USER_RESEARCH:
    case DELETE_USER_RESEARCH:
      return {
        ...state,
        payload: action.payload,
        loading: true,
      };
    case GET_USER_RESEARCH_SUCCESS:
      return {
        ...state,
        results: action.payload,
        loading: false,
      };

    case ARCHIVE_USER_RESEARCH_SUCCESS: {
      const resultsArray = state.results.data.results;
      const newResults = updateArchivedItem(
        resultsArray,
        action.payload._id,
        action.payload.data.archived,
      );
      return {
        ...state,
        results: {
          ...state.results,
          newResults,
        },
        loading: false,
      };
    }
    case DELETE_USER_RESEARCH_SUCCESS:
      return {
        ...state,
        results: {
          ...state.results,
          data: {
            ...state.results.data,
            results: state.results.data.results.filter(
              (items) => items._id !== action.payload,
            ),
          },
        },
        loading: false,
      };
    case ARCHIVE_USER_RESEARCH_FAILURE:
    case GET_USER_RESEARCH_FAILURE:
    case DELETE_USER_RESEARCH_FAILURE:
      return {
        ...state,
        payload: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default getResearchReducer;
