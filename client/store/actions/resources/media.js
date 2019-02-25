import {
  DELETE_MEDIA,
  DELETE_MEDIA_FAILURE,
  DELETE_MEDIA_SUCCESS,
} from '../../../constants/resources/media';

export const deleteMedia = (payload) => ({
  type: DELETE_MEDIA,
  payload,
});

export const deleteMediaSuccess = (payload) => ({
  type: DELETE_MEDIA_SUCCESS,
  payload,
});

export const deleteMediaFailure = (payload) => ({
  type: DELETE_MEDIA_FAILURE,
  payload,
});
