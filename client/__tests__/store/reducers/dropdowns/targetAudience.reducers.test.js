import {
  FETCH_TARGET_AUDIENCES,
  FETCHING_TARGET_AUDIENCES,
  TARGET_AUDIENCES_CREATED_SUCCESS,
  UPDATE_TARGET_AUDIENCES_FAILURE,
  UPDATE_TARGET_AUDIENCES,
  DELETE_TARGET_AUDIENCE,
  CREATE_TARGET_AUDIENCES_FAILURE,
  CREATE_TARGET_AUDIENCES,
} from '../../../../constants/dropdowns/targetAudience';
import targetAudienceReducer, {
  initialState,
} from '../../../../store/reducers/dropdowns/targetAudience';

describe('targetAudienceReducer Reducer', () => {
  it('should provide an initial state', () => {
    expect(targetAudienceReducer(initialState, {})).toEqual(initialState);
  });
  it('should fetch targetAudienceReducer', () => {
    expect(
      targetAudienceReducer(null, {
        type: FETCH_TARGET_AUDIENCES,
        payload: { isFetching: false },
      }).isFetching,
    ).toEqual(false);
  });
  it('should show fetching staff strengths', () => {
    expect(
      targetAudienceReducer(null, {
        type: FETCHING_TARGET_AUDIENCES,
        payload: { TargetAudiences: { TargetAudiences: [] } },
      }).isFetching,
    ).toEqual(true);
  });
  it('should delete staff strength', () => {
    expect(
      targetAudienceReducer(null, {
        type: DELETE_TARGET_AUDIENCE,
        payload: {},
      }),
    ).toEqual({ loading: false });
  });

  it('should create staff strength', () => {
    expect(
      targetAudienceReducer(null, {
        type: CREATE_TARGET_AUDIENCES,
        payload: {},
      }).isFetching,
    ).toEqual(true);
  });

  it('should update staff strength', () => {
    expect(
      targetAudienceReducer(null, {
        type: UPDATE_TARGET_AUDIENCES,
        payload: {},
      }).isFetching,
    ).toEqual(true);
  });

  it('should set staff strength as created successfully', () => {
    expect(
      targetAudienceReducer(null, {
        type: TARGET_AUDIENCES_CREATED_SUCCESS,
        payload: {},
      }).isFetching,
    ).toEqual(false);
  });

  it('should delete a staff strength', () => {
    expect(
      targetAudienceReducer(initialState, {
        type: DELETE_TARGET_AUDIENCE,
        payload: {},
      }).isFetching,
    ).toEqual(false);
  });

  it('should show staff strength failure', () => {
    expect(
      targetAudienceReducer(initialState, {
        type: CREATE_TARGET_AUDIENCES_FAILURE,
        payload: {},
      }).isFetching,
    ).toEqual(false);
  });

  it('should show update staff strength failure', () => {
    expect(
      targetAudienceReducer(initialState, {
        type: UPDATE_TARGET_AUDIENCES_FAILURE,
        payload: {},
      }).isFetching,
    ).toEqual(false);
  });
});
