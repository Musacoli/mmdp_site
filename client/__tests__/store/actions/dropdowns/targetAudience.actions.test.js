import {
  FETCH_TARGET_AUDIENCES,
  UPDATE_TARGET_AUDIENCES,
  DELETE_TARGET_AUDIENCE,
  CREATE_TARGET_AUDIENCES,
  TARGET_AUDIENCES_CREATED_SUCCESS,
  FETCHING_TARGET_AUDIENCES,
} from '../../../../constants/dropdowns/targetAudience';
import {
  fetchTargetAudiences,
  deleteTargetAudience,
  targetAudiencesCreatedSuccessfully,
  createTargetAudiences,
  updateTargetAudiences,
  fetchingTargetAudiences,
} from '../../../../store/actions';

describe('TargetAudience Actions Creators', () => {
  it('should dispatch TOGGLE_DELETE_TARGET_AUDIENCE', () => {
    expect(deleteTargetAudience({}).type).toEqual(DELETE_TARGET_AUDIENCE);
  });
  it('should dispatch UPDATE_TARGET_AUDIENCE', () => {
    expect(updateTargetAudiences({}).type).toEqual(UPDATE_TARGET_AUDIENCES);
  });
  it('should dispatch FETCH_TARGET_AUDIENCE', () => {
    expect(fetchTargetAudiences({}).type).toEqual(FETCH_TARGET_AUDIENCES);
  });
  it('should dispatch TARGET_AUDIENCE_CREATED_SUCCESS', () => {
    expect(targetAudiencesCreatedSuccessfully({}).type).toEqual(
      TARGET_AUDIENCES_CREATED_SUCCESS,
    );
  });
  it('should dispatch FETCH_TARGET_AUDIENCES', () => {
    expect(fetchTargetAudiences({}).type).toEqual(FETCH_TARGET_AUDIENCES);
  });

  it('should dispatch fetchingTargetAudiences', () => {
    expect(fetchingTargetAudiences({}).type).toEqual(FETCHING_TARGET_AUDIENCES);
  });

  it('should dispatch CREATE_TARGET_AUDIENCE', () => {
    expect(createTargetAudiences({}).type).toEqual(CREATE_TARGET_AUDIENCES);
  });
});
