import SagaTester from 'redux-saga-tester';
import {
  fetchStates,
  searchStakeholders,
  fetchStatesLGAs,
} from '../../../store/sagas/resources/Stakeholders';
import StakeholdersReducer from '../../../store/reducers/resources/Stakeholders';
import * as types from '../../../constants/resources/Stakeholders';
import * as actions from '../../../store/actions/resources/Stakeholders';

describe('Stakeholders Saga', () => {
  let TestSaga;

  beforeEach(() => {
    TestSaga = new SagaTester({
      initialState: {},
      reducers: StakeholdersReducer,
    });
  });

  it('should fetchStates', async () => {
    TestSaga.start(fetchStates);
    const state = TestSaga.getState();

    expect(state.loading).toEqual(false);

    await TestSaga.waitFor(types.GET_ALL_NIGERIAN_STATES_SUCCESS);
  });

  it('should search stakeholders and fail', async () => {
    TestSaga.start(searchStakeholders);
    TestSaga.dispatch(actions.searchStakeHolders({}));
    await TestSaga.waitFor(types.FETCH_STAKEHOLDERS_FAILURE);
  });

  it('should fetch LGAs', async () => {
    TestSaga.start(fetchStatesLGAs);
    TestSaga.dispatch(actions.getNigerianStateLGAS([]));
    await TestSaga.waitFor(types.GET_ALL_NIGERIAN_LGAS_FAILURE);
  });
});
