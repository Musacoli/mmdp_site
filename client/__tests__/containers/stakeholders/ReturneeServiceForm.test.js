import React from 'react';
import { mount } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ReturneeServiceForm from '../../../containers/Resources/StakeHolders/addStakeholder/ReturneeServiceForm';
import reduxStateData from '../../common/stakeholders/reduxState';
import { beneficiaryInformationTemplate } from '../../../utils/resources/stakeholderDirectory/staticFields';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe(' test Beneficiary service form', () => {
  let props = {};
  const handleChange = (event, { name, value }) => {
    props.data[name] = value;
  };
  props = {
    step: 2,
    pages: 2,
    handlePrev: () => {},
    handleNext: () => {},
    handleChange,
    handleSubmit: () => {},
    handleAddNewBeneficiary: () => {},
    data: [beneficiaryInformationTemplate],
    dataTemplate: {},
    reduxState: reduxStateData,
  };

  const store = mockStore(reduxStateData);
  const wrapper = mount(
    <Provider store={store}>
      <ReturneeServiceForm {...props} />
    </Provider>,
    new ReactRouterEnzymeContext(),
  );

  it('should load correctly', () => {
    expect(wrapper.find('BeneficiaryServicesForm').length).toBe(1);
  });

  it('should add a new Beneficiary Type Row correctly', () => {
    wrapper.find('span[role="button"]').simulate('click');
  });

  it('should update the states list', () => {
    wrapper.find('Dropdown[name="country"]').simulate('click');
    wrapper
      .find('DropdownItem[value="5c9256d40167a3091877c5b4"]')
      .simulate('click');
    wrapper.update();
  });

  it('should not add a new Beneficiary Type Row correctly if options are empty', () => {
    reduxStateData.beneficiaryTypes.data = [];
    const store = mockStore(reduxStateData);
    const wrapper2 = mount(
      <Provider store={store}>
        <ReturneeServiceForm {...props} />
      </Provider>,
      new ReactRouterEnzymeContext(),
    );

    wrapper2.find('span[role="button"]').simulate('click');
  });
});
