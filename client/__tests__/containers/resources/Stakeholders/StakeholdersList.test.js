import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Faker from 'faker';
import { getOptions } from '../../../components/resources/Stakeholders/SearchFilters.test';
import StakeholdersList from '../../../../containers/Resources/StakeHolders/StakeholdersList';

describe('StakeholdersList', () => {
  const data = [
    [
      {
        _id: Faker.random.uuid(),
        basicInformation: {
          stakeholderName: Faker.name.title(),
          state: Faker.address.state(),
          email: Faker.internet.email(),
          phoneNumberOne: Faker.phone.phoneNumber(),
          phoneNumberThree: Faker.phone.phoneNumber(),
        },
        beneficiaryService: {
          localGovernment: Faker.name.title(),
        },
      },
    ],
    [
      {
        _id: Faker.random.uuid(),
        basicInformation: {
          stakeholderName: Faker.name.title(),
          state: Faker.address.state(),
          email: Faker.internet.email(),
          phoneNumberOne: Faker.phone.phoneNumber(),
          phoneNumberThree: Faker.phone.phoneNumber(),
        },
        beneficiaryService: {
          localGovernment: Faker.name.title(),
        },
      },
    ],
    [
      {
        _id: Faker.random.uuid(),
        basicInformation: {
          stakeholderName: Faker.name.title(),
          state: Faker.address.state(),
          email: Faker.internet.email(),
          phoneNumberOne: Faker.phone.phoneNumber(),
          phoneNumberThree: Faker.phone.phoneNumber(),
        },
        beneficiaryService: {
          localGovernment: Faker.name.title(),
        },
      },
    ],
  ];

  const pagination = {
    total: 11,
    currentPage: 1,
    totalPages: 2,
    pages: [1, 2],
    previous: false,
    next: 2,
    first: 1,
    last: 8,
  };
  const testStates = getOptions();
  const mockStore = configureStore();
  let wrapper;
  let store;

  const props = {
    getStates: jest.fn(),
    getLGAs: jest.fn(),
    search: jest.fn(),
    states: testStates,
    LGAs: testStates,
    stakeholders: {
      stakeholders: {
        data,
      },
    },
    stakeholdersLoading: false,
  };

  const initialState = {
    stakeholdersDirectory: {
      stakeholders: {
        stakeholders: undefined,
      },
      payload: {
        states: testStates,
      },
      payload2: {
        lGAs: testStates,
      },
      stakeholdersLoading: false,
    },
  };

  beforeEach(() => {
    initialState.stakeholdersDirectory.stakeholders.stakeholders = {
      data,
      pagination,
    };
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <StakeholdersList {...props} />
      </Provider>,
    );
  });

  it('should should Load a loader on first load', () => {
    initialState.stakeholdersDirectory.stakeholders.stakeholders = undefined;
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <StakeholdersList {...props} />
      </Provider>,
    );
    expect(
      wrapper.find('StakeholdersList').find('SimpleLoader').length,
    ).toEqual(1);
  });

  it('should load completely', () => {
    wrapper.find('StakeholdersList').setState({
      loading: false,
    });
    expect(
      wrapper.find('StakeholdersList').find('SearchFiltersRow').length,
    ).toEqual(1);
    expect(
      wrapper.find('StakeholdersList').find('StakeHoldersCardsList').length,
    ).toEqual(1);
    expect(wrapper.find('StakeholdersList').find('Pagination').length).toEqual(
      1,
    );
  });

  it('should have testable events ', () => {
    wrapper
      .find('StakeholdersList')
      .find('Search')
      .find('input')
      .simulate('focus')
      .simulate('change', { target: { value: 'abs' } });

    wrapper
      .find('StakeholdersList')
      .find('Search')
      .find('input')
      .simulate('focus')
      .simulate('change', { target: { currentValue: undefined } });

    wrapper
      .find('StakeholdersList')
      .find('Search')
      .find('Button')
      .simulate('click');

    wrapper
      .find('StakeholdersList')
      .find('SearchFiltersRow')
      .find('DropdownSearchQuery')
      .at(0)
      .setState({ currentValue: ['state'] });

    wrapper
      .find('StakeholdersList')
      .find('SearchFiltersRow')
      .find('DropdownSearchQuery')
      .at(0)
      .instance()
      .handleChange({}, '');

    wrapper
      .find('StakeholdersList')
      .find('SearchFiltersRow')
      .find('DropdownSearchQuery')
      .at(0)
      .setState({ currentValue: '' });

    wrapper
      .find('StakeholdersList')
      .find('SearchFiltersRow')
      .find('DropdownSearchQuery')
      .at(1)
      .setState({ currentValue: 'state' });

    wrapper
      .find('StakeholdersList')
      .find('SearchFiltersRow')
      .find('DropdownSearchQuery')
      .at(1)
      .setState({ currentValue: undefined });
  });
});
