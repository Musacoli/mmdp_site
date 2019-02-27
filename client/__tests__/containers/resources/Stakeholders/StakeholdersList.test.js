import React from 'react';
import configureStore from 'redux-mock-store';
import faker from 'faker';
import { BrowserRouter as Router } from 'react-router-dom';
import { getOptions } from '../../../components/resources/Stakeholders/SearchFilters.test';
import StakeholdersList from '../../../../containers/Resources/StakeHolders/StakeholdersList';
import { mountWithProvider } from '../../../common/utils';

export const returnStakeholders = () => ({
  _id: faker.random.uuid(),
  basicInformation: {
    stakeholderName: faker.name.findName(10),
    email: faker.internet.email(10),
    organisationType: faker.random.word(10),
    registrationStatus: faker.random.word(10),
    yearOfRegistration: String(faker.date.past()),
    registrationNumber: String(faker.random.number()),
    volunteers: faker.name.findName(10),
    numberOfVolunteers: faker.random.number(),
    partnerships: faker.name.findName(10),
    partnershipType: faker.random.word(10),
    impactType: faker.random.word(10),
    operatingInEdoState: faker.random.boolean(),
    edoStateOperationStartYear: faker.date.past(),
    partnerWithEdoStateGovernment: faker.random.boolean(),
    country: faker.address.country(),
    state: faker.address.state(),
    founder: faker.name.findName(10),
    website: faker.internet.url(),
    headOfficeAddress: faker.address.streetAddress(),
    stateOfficeAddress: faker.address.streetAddress(),
    phoneNumberOne: faker.phone.phoneNumber(),
    phoneNumberTwo: faker.phone.phoneNumber(),
    phoneNumberThree: faker.phone.phoneNumber(),
    staffStrength: String(faker.random.number()),
    localContactPerson: faker.name.findName(10),
    contactPersonEmailAddress: faker.internet.email(10),
    contactPersonPhoneNumber: faker.phone.phoneNumber(),
    notes: faker.random.word(30),
  },
  beneficiaryService: [
    {
      serviceName: faker.name.findName(10),
      targetAudience: faker.name.findName(10),
      beneficiaryType: faker.random.word(10),
      numberOfMaleBeneciaries: faker.random.number(),
      numberOfFemaleBeneciaries: faker.random.number(),
      frequency: faker.random.number(),
      duration: faker.random.word(10),
      numberOfBeneciariesPerService: faker.random.number(),
      thematicPillars: faker.random.word(10),
      subTheme: faker.random.word(10),
      focusArea: faker.random.word(10),
      fundingSource: faker.random.word(10),
      amountInvested: String(faker.random.number()),
      country: faker.address.country(),
      state: faker.address.state(),
      localGovernment: faker.name.findName(10),
      ward: faker.name.findName(10),
      localCommunities: faker.name.findName(10),
      totalNumberOfBeneficiaries: faker.random.number(),
      notes: faker.random.word(30),
    },
  ],
});

describe('StakeholdersList', () => {
  const data = [
    [returnStakeholders()],
    [returnStakeholders()],
    [returnStakeholders()],
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
    wrapper = mountWithProvider(
      <Router>
        <StakeholdersList {...props} />
      </Router>,
      store,
    );
  });

  const getDropdown = (index) =>
    wrapper
      .find('StakeholdersList')
      .find('SearchFiltersRow')
      .find('DropdownSearchQuery')
      .at(index);

  it('should should Load a loader on first load', () => {
    initialState.stakeholdersDirectory.stakeholders.stakeholders = undefined;
    store = mockStore(initialState);
    wrapper = mountWithProvider(<StakeholdersList {...props} />);
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

    getDropdown(0).setState({ currentValue: ['state'] });

    getDropdown(0)
      .instance()
      .handleChange({}, '');

    getDropdown(0).setState({ currentValue: '' });

    getDropdown(1).setState({ currentValue: 'state' });

    getDropdown(1).setState({ currentValue: undefined });
  });
});
