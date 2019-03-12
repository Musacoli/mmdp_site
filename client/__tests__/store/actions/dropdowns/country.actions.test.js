import {
  FETCH_COUNTRY,
  FETCH_COUNTRY_FAILURE,
  FETCH_COUNTRY_SUCCESS,
} from '../../../../constants';
import * as statesActions from '../../../../store/actions/dropdowns/country';
import stateReducer, {
  initialState,
  countryOptions,
} from '../../../../store/reducers/dropdowns/country';

const actions = [
  {
    type: FETCH_COUNTRY,
    action: statesActions.fetchCountry,
    expected: true,
  },
  {
    type: FETCH_COUNTRY_FAILURE,
    action: statesActions.fetchCountryFailure,
    expected: false,
  },
  {
    type: FETCH_COUNTRY_SUCCESS,
    action: statesActions.fetchCountrySuccess,
    expected: false,
  },
];

describe('Dropdown country actions', () => {
  actions.map((action) =>
    it(`should dispatch ${action.type}`, () => {
      expect(action.action({}).type).toEqual(action.type);
    }),
  );
});

describe('countryReducer', () => {
  actions.map((action) =>
    it(`should set ${action.type}`, () => {
      expect(stateReducer(initialState, action).loading).toEqual(
        action.expected,
      );
    }),
  );
  it('should provide an initial state', () => {
    expect(stateReducer(initialState, {})).toEqual(initialState);
  });
  it('should create country options', () => {
    const options = [{ _id: 'id', countryName: 'aname' }];
    const data = countryOptions(options);
    expect(data[0].text).toEqual('aname');
  });
});
