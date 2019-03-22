import React from 'react';
import { mount } from 'enzyme';
import StatusForm from '../../../components/common/Form/regDropdownForm';

describe('<StatusForm />', () => {
  let wrapper;
  let props;
  const registrationStatus = 'Registered';
  beforeEach(() => {
    props = {
      editAState: jest.fn(),
      deleteAState: jest.fn(),
      deleteState: jest.fn(),
      item: {
        description: 'asdfasdf',
        registrationStatus,
        __v: 0,
        _id: '5c90de765a04a53d87040c5e',
      },
      loading: false,
      dropdowns: [
        {
          description: 'asdfasdf',
          registrationStatus,
          __v: 0,
          _id: '5c90de765a04a53d87040c5e',
        },
        {
          description: 'asdfasdf',
          registrationStatus: 'Not registered',
          __v: 0,
          id: '5c90de765a04a53d87040c5e',
        },
      ],
    };
    wrapper = mount(<StatusForm {...props} />);
  });
  it('should render Status form component without crashing', () => {
    expect(wrapper.find('RegistrationStatusForm').length).toEqual(1);
  });
});
