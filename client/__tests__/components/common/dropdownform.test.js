import React from 'react';
import { mount } from 'enzyme';
import DropdownForm from '../../../components/common/Form/DropdownForm';

describe('<DropdownForm />', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      item: {
        countryId: '5c878ecd6d5a6b1184b93519',
        description: 'asdfasdf',
        stateName: 'sfasdfasdfsdf',
        __v: 0,
        id: '5c90de765a04a53d87040c5e',
      },
      editAState: jest.fn(),
      deleteAState: jest.fn(),
      inputs: [
        {
          type: 'text',
          name: 'stateName',
          label: 'State name',
          className: 'animated fadeIn',
          fluid: true,
          placeholder: 'Enter state name',
          value: 'name',
        },
        {
          type: 'select',
          name: 'stateName2',
          label: 'State name2',
          className: 'animated fadeIn',
          fluid: true,
          placeholder: 'Enter state name2',
          value: 'name2',
          options: [{ value: 'sdf', text: '_id' }],
        },
      ],
    };
    wrapper = mount(<DropdownForm {...props} />);
  });
  it('should render dropdown form component without crashing', () => {
    wrapper.find('input').simulate('change');
    expect(wrapper.find('DropdownForm').length).toEqual(1);
    wrapper.find('DropdownItem').simulate('change');
  });
});
