/* eslint-env jest */
import * as types from '../../../../constants/about';
import * as edoStateApproachActions from '../../../../store/actions/about/edoStateApproach';

describe('Edo State Approach Actions Creators', () => {
  it('should dispatch CREATE_EDO_STATE_APPROACH_REQUEST', () => {
    expect(edoStateApproachActions.createEdoStateApproach({}).type).toEqual(
      types.CREATE_EDO_STATE_APPROACH_REQUEST,
    );
  });
  it('should dispatch GET_EDO_STATE_APPROACH_REQUEST', () => {
    expect(edoStateApproachActions.getEdoStateApproach({}).type).toEqual(
      types.GET_EDO_STATE_APPROACH_REQUEST,
    );
  });
  it('should dispatch UPDATE_EDO_STATE_APPROACH_REQUEST', () => {
    expect(edoStateApproachActions.updateEdoStateApproach({}).type).toEqual(
      types.UPDATE_EDO_STATE_APPROACH_REQUEST,
    );
  });
});
