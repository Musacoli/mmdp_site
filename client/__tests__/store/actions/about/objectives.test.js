/* eslint-env jest */
import * as types from '../../../../constants/about';
import * as objectivesActions from '../../../../store/actions/about/objectives';

describe('Objectives Actions Creators', () => {
  it('should dispatch CREATE_OBJECTIVES_REQUEST', () => {
    expect(objectivesActions.createObjectives({}).type).toEqual(
      types.CREATE_OBJECTIVES_REQUEST,
    );
  });
  it('should dispatch GET_OBJECTIVES_REQUEST', () => {
    expect(objectivesActions.getObjectives({}).type).toEqual(
      types.GET_OBJECTIVES_REQUEST,
    );
  });
  it('should dispatch UPDATE_OBJECTIVES_REQUEST', () => {
    expect(objectivesActions.updateObjectives({}).type).toEqual(
      types.UPDATE_OBJECTIVES_REQUEST,
    );
  });
});
