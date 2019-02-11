import * as types from '../../constants/stakeholderDirectory';
import * as actions from '../../store/actions/stakeholders/stakeholders';

describe('add stakeholder action creators', () => {
  it('should dispatch add stakeholder request action', () => {
    expect(actions.addStakeholderRequest({}).type).toEqual(
      types.ADD_STAKEHOLDER_REQUEST,
    );
  });

  it('should dispatch add stakeholder success action', () => {
    expect(actions.addStakeholderSuccess({}).type).toEqual(
      types.ADD_STAKEHOLDER_SUCCESS,
    );
  });

  it('should dispatch add stakeholder failure action', () => {
    expect(actions.addStakeholderFailure({}).type).toEqual(
      types.ADD_STAKEHOLDER_FAILURE,
    );
  });
});
