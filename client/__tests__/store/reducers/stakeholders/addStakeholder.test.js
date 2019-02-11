import * as types from '../../../../constants/stakeholderDirectory';
import addStakeholder, {
  initialState,
} from '../../../../store/reducers/stakeholders/addStakeholder';

describe('create stakeholder reducer', () => {
  it('should provide an initial state', () => {
    expect(addStakeholder(initialState, {})).toEqual({
      response: null,
      adding: false,
      error: null,
    });
  });

  it('should make a create stakeholder request', () => {
    expect(
      addStakeholder(initialState, {
        type: types.ADD_STAKEHOLDER_REQUEST,
        payload: { adding: true },
      }).adding,
    ).toEqual(true);
  });

  it('should add stakeholder successfully', () => {
    expect(
      addStakeholder(initialState, {
        type: types.ADD_STAKEHOLDER_SUCCESS,
        payload: { adding: false },
      }).adding,
    ).toEqual(false);
  });

  it('should handle add stakeholder failure', () => {
    expect(
      addStakeholder(initialState, {
        type: types.ADD_STAKEHOLDER_FAILURE,
        payload: { adding: false },
      }).adding,
    ).toEqual(false);
  });
});
