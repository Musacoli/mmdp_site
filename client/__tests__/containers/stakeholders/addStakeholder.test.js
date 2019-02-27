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
    wrapper
      .find('AddStakeholder')
      .find('Button')
      .simulate('click');
    wrapper.find('AddStakeholder').update();
  });

  it('should should load the returnee service form', () => {
    wrapper.find('AddStakeholder').setState({ step: 2 });
    wrapper.find('AddStakeholder').update();
    wrapper
      .find('AddStakeholder')
      .find("input[name='serviceName']")
      .simulate('change', { target: { value: 'text' } });
    expect(wrapper.find('ReturneeServiceForm').length).toBe(1);
  });

  it('should navigate to the previous page', () => {
    wrapper.find('AddStakeholder').setState({ step: 2 });
    wrapper.find('AddStakeholder').update();
    wrapper
      .find('AddStakeholder')
      .find('Button .btn-back')
      .simulate('click');
  });

  it('should add a new beneficiary form', () => {
    wrapper.find('AddStakeholder').setState({ step: 2 });
    wrapper.find('AddStakeholder').update();
    wrapper
      .find('AddStakeholder')
      .find('Button .btn-add-new')
      .simulate('click');
  });

  it('should handle submit and validation', () => {
    wrapper.find('AddStakeholder').setState({ step: 2 });
    wrapper.find('AddStakeholder').update();
    wrapper
      .find('AddStakeholder')
      .find('Button .btn-save')
      .simulate('click');
  });
});
