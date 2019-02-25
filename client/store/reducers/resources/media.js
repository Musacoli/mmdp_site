import {
  DELETE_MEDIA,
  DELETE_MEDIA_FAILURE,
  DELETE_MEDIA_SUCCESS,
} from '../../../constants/resources/media';

export const initialState = {
  isDeleting: false,
  _id: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case DELETE_MEDIA:
      return { ...state, ...payload, isDeleting: true };
    case DELETE_MEDIA_SUCCESS:
      return { ...state, ...payload, isDeleting: false };
    case DELETE_MEDIA_FAILURE:
      return { ...state, ...payload, isDeleting: false };
    default:
      return state;
  }
};
