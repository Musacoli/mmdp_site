import * as types from '../../../../constants/matrix/country';
import * as countryActions from '../../../../store/actions/matrix/country';
import CountyMapReducer, {
  initialState,
} from '../../../../store/reducers/matrix/country';

const actions = [
  {
    type: types.ADD_COUNTRY_MAP,
    action: countryActions.addCountryMap,
    expected: true,
  },
  {
    type: types.ADD_COUNTRY_MAP_FAILURE,
    action: countryActions.addCountryMapFailure,
    expected: false,
  },
  {
    type: types.ADD_COUNTRY_MAP_SUCCESS,
    action: countryActions.addCountryMapSuccess,
    expected: false,
  },
  {
    type: types.UPDATE_COUNTRY_MAP,
    action: countryActions.updateCountryMap,
    expected: true,
  },
  {
    type: types.UPDATE_COUNTRY_MAP_FAILURE,
    action: countryActions.updateCountryMapFailure,
    expected: false,
  },
  {
    type: types.UPDATE_COUNTRY_MAP_SUCCESS,
    action: countryActions.updateCountryMapSuccess,
    expected: false,
  },
  {
    type: types.FETCH_COUNTRY_MAP,
    action: countryActions.fetchCountryMap,
    expected: true,
  },
  {
    type: types.FETCH_COUNTRY_MAP_SUCCESS,
    action: countryActions.fetchCountryMapSuccess,
    expected: false,
  },
  {
    type: types.FETCH_COUNTRY_MAP_FAILURE,
    action: countryActions.fetchCountryMapFailure,
    expected: false,
  },
];

describe('CountryMap actions', () => {
  actions.map((action) =>
    it(`should dispatch ${action.type}`, () => {
      expect(action.action({}).type).toEqual(action.type);
    }),
  );
});

describe('CountryMap Reducer', () => {
  actions.map((action) =>
    it(`should set ${action.type}`, () => {
      expect(CountyMapReducer(initialState, action).loading).toEqual(
        action.expected,
      );
    }),
  );
  it('should provide an initial state', () => {
    expect(CountyMapReducer(initialState, {})).toEqual(initialState);
  });
});
