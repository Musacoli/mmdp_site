import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import configureStore from 'redux-mock-store';
import { AddStakeholder } from '../../../containers/Resources/StakeHolders/addStakeholder/addStakeholder';
import reduxStateData from '../../common/stakeholders/reduxState';
import { getStakeholderData } from '../../utils/resources/stakeholdersDirectory/formValidation.test';

describe('Add stakeholder Form', () => {
  const props = {
    addStakeholder: () => {},
    match: { params: {} },
    reduxState: reduxStateData,
    getStates: () => {},
    getOrganisationTypes: () => {},
    getRegistrationStatuses: () => {},
    getStakeholders: () => {},
    getPartnershipTypes: () => {},
    getImpactTypes: () => {},
    getCountries: () => {},
    fetchStaffStrengths: () => {},
  };

  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const store = mockStore(reduxStateData);
  let wrapper = mount(
    <Provider store={store}>
      <AddStakeholder {...props} />
    </Provider>,
    new ReactRouterEnzymeContext(),
  );
  it('should load correctly', () => {
    expect(wrapper.find('StakeholderDetailsForm').length).toEqual(1);
  });
  it('should not go to the next form if required fields are not filled', () => {
    wrapper.find('Button').simulate('click');
    expect(wrapper.find('StakeholderDetailsForm').length).toEqual(1);
  });

  it('should handle change basic info in iputs', () => {
    wrapper
      .find('input[name="organisationName"]')
      .simulate('change', { target: { value: 'dbdbdb' } });
    wrapper
      .find('input[name="stateOfficeAddress"]')
      .simulate('change', { target: { value: 'dbdbdb' } });
  });

  it('should  go to the next form if required fields are  filled', () => {
    props.basicInformationTemplate = getStakeholderData();
    wrapper = mount(
      <Provider store={store}>
        <AddStakeholder {...props} />
      </Provider>,
      new ReactRouterEnzymeContext(),
    );
    wrapper.find('Button').simulate('click');
    wrapper.update();
    expect(wrapper.find('ReturneeServiceForm').length).toEqual(1);
  });
});
