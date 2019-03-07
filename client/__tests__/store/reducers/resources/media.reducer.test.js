import {
  DELETE_MEDIA,
  DELETE_MEDIA_FAILURE,
  DELETE_MEDIA_SUCCESS,
} from '../../../../constants/resources/media';

import mediaReducer, {
  initialState,
} from '../../../../store/reducers/resources/media';

const mediaActions = [
  {
    type: DELETE_MEDIA,
    expected: true,
    payload: {},
  },
  {
    type: DELETE_MEDIA_SUCCESS,
    expected: false,
    payload: {},
  },
  {
    type: DELETE_MEDIA_FAILURE,
    expected: false,
    payload: {},
  },
];

describe('Media reducers', () => {
  mediaActions.map((action) => {
    return it(`should set ${action.type}`, () => {
      expect(mediaReducer(initialState, action).isDeleting).toEqual(
        action.expected,
      );
    });
  });
  it('should provide media an initial state', () => {
    expect(mediaReducer(initialState, {})).toEqual(initialState);
  });
});
