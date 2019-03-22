import React from 'react';
import { mount } from 'enzyme';
import { RegistrationStatusDropdown } from '../../../containers/DropDowns/RegistrationStatus';

describe('< RegistrationStatusDropdown/>', () => {
  let wrapper;
  let props;
  const registrationStatus = 'Registered';
  beforeEach(() => {
    props = {
      addStatuses: jest.fn(),
      fetchStatuses: jest.fn(),
      deleteStatus: jest.fn(),
      loading: false,
      statuses: [
        {
          description: 'asdfasdf',
          registrationStatus,
          __v: 0,
          _id: '5c90de765a04a53d87040c5e',
        },
        {
          description: 'asdfasdf',
          registrationStatus: 'Unknown',
          __v: 0,
          id: '5c90de765a04a53d87040c5e',
        },
      ],
    };
    wrapper = mount(<RegistrationStatusDropdown {...props} />);
  });
  it('should render Registratus status component without crashing', () => {
    expect(wrapper.find('RegistrationStatusDropdown').length).toEqual(1);
  });
  it('should add temp state', () => {
    wrapper.instance().addTempState();
    wrapper.instance().editAStatus(props.statuses[0]);
    wrapper.instance().deleteAStatus(props.statuses[0]);
    wrapper.instance().deleteAStatus(props.statuses[1]);
    wrapper.instance().componentDidUpdate();
    wrapper.instance().handleSubmit();
    expect(wrapper.state('dropdowns')[0].registrationStatus).toEqual(
      registrationStatus,
    );
  });
});
