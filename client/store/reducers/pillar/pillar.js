import * as types from '../../../constants/pillar/pillar';

const pillarOneInitialState = {
  error: null,
  loading: false,
};

const pillarTwoInitialState = {
  error: null,
  loading: false,
};

const pillarThreeInitialState = {
  error: null,
  loading: false,
};

const pillarFourInitialState = {
  error: null,
  loading: false,
};

// Pillar one reducer
export const pillarOneReducer = (
  state = pillarOneInitialState,
  action = {},
) => {
  switch (action.type) {
    case types.PILLAR_MESSAGE_SUCCESS_ONE:
      return {
        ...action.payload,
        loading: false,
      };

    case types.PILLAR_MESSAGE_LOADING_ONE:
      return {
        ...state,
        loading: true,
      };
    case types.PILLAR_MESSAGE_FAILURE_ONE:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

// Pillar two reducer
export const pillarTwoReducer = (
  state = pillarTwoInitialState,
  action = {},
) => {
  switch (action.type) {
    case types.PILLAR_MESSAGE_SUCCESS_TWO:
      return {
        ...action.payload,
        loading: false,
      };

    case types.PILLAR_MESSAGE_LOADING_TWO:
      return {
        ...state,
        loading: true,
      };
    case types.PILLAR_MESSAGE_FAILURE_TWO:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

// Pillar three reducer
export const pillarThreeReducer = (
  state = pillarThreeInitialState,
  action = {},
) => {
  switch (action.type) {
    case types.PILLAR_MESSAGE_SUCCESS_THREE:
      return {
        ...action.payload,
        loading: false,
      };

    case types.PILLAR_MESSAGE_LOADING_THREE:
      return {
        ...state,
        loading: true,
      };
    case types.PILLAR_MESSAGE_FAILURE_THREE:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

// Pillar four reducer
export const pillarFourReducer = (
  state = pillarFourInitialState,
  action = {},
) => {
  switch (action.type) {
    case types.PILLAR_MESSAGE_SUCCESS_FOUR:
      return {
        ...action.payload,
        loading: false,
      };

    case types.PILLAR_MESSAGE_LOADING_FOUR:
      return {
        ...state,
        loading: true,
      };
    case types.PILLAR_MESSAGE_FAILURE_FOUR:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
