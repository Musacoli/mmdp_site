import StakeholdersReducer from '../../../../store/reducers/resources/Stakeholders';
import * as actions from '../../../../store/actions/resources/Stakeholders';

describe('Stakeholders Reducers', () => {
  const initialState = {
    loading: false,
    stakeholdersLoading: true,
    payload: [],
    payload2: [],
    stakeholders: [],
    filterStatus: false,
  };
  it('should return initial state', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = StakeholdersReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should return handle  FETCH_STAKEHOLDERS_SUCCESS ', () => {
    initialState.stakeholders = {};
    initialState.stakeholdersLoading = false;
    const action = actions.searchStakeHoldersSucess({});
    const state = StakeholdersReducer(undefined, action);
    expect(state).toEqual(initialState);
  });
});
