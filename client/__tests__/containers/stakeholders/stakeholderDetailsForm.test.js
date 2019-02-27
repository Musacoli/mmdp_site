import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import StakeholderDetailsForm from '../../../containers/Resources/StakeHolders/addStakeholder/stakeholderDetailsForm';
import reduxStateData from '../../common/stakeholders/reduxState';
import {
  basicInformationTemplate,
  stakeholderAddressItemTemplate,
} from '../../../utils/resources/stakeholderDirectory/staticFields';

describe('StakeholdersDetails', () => {
  const fn = jest.fn();
  const getStates = jest.fn();
  let props = {};
  const data = basicInformationTemplate;
  data.cacRcNumber = 'llflf';
  const handleChange = (event, { name, value }) => {
    props.addressData[name] = value;
    props.data[name] = value;
  };
  props = {
    step: 1,
    pages: 2,
    handleNext: () => {},
    handleChange,
    updateRequiredFields: fn,
    data,
    addressData: stakeholderAddressItemTemplate,
    reduxState: reduxStateData,
    getStates,
  };
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const store = mockStore(reduxStateData);

  const wrapper = mount(
    <Provider store={store}>
      <StakeholderDetailsForm {...props} />
    </Provider>,
    new ReactRouterEnzymeContext(),
  );

  it('should load correctly', () => {
    expect(wrapper.find('BasicInformationForm').length).toBe(1);
  });

  it('should handle the registration status', () => {
    wrapper.find("Dropdown[name='registrationStatusId']").simulate('click');
    wrapper
      .find("DropdownItem[value='5c9256d30167a3091877c5a6']")
      .simulate('click');
    wrapper.update();
    expect(fn).toHaveBeenCalled();
  });
  it('should handleStatesOptionsUpdate', () => {
    wrapper.find("Dropdown[name='country']").simulate('click');
    wrapper
      .find("DropdownItem[value='5c9256d40167a3091877c5b4']")
      .simulate('click');
    wrapper.update();
    expect(getStates).toHaveBeenCalled();
  });
});
