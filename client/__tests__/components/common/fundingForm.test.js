import React from 'react';
import { mount } from 'enzyme';
import DropdownForm from '../../../components/common/Form/DropdownForm/index';

describe('<DropdownForm />', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      item: {
        description: 'asdfasdf',
        sourceOfFunding: 'sfasdfasdfsdf',
        __v: 0,
        id: '5c90de765a04a53d87040c5e',
      },
      editFunding: jest.fn(),
      deleteAFunding: jest.fn(),
      inputs: [
        {
          type: 'text',
          name: 'sourceOfFundingName',
          label: 'State name',
          className: 'animated fadeIn',
          fluid: true,
          placeholder: 'Enter source of funding name',
          value: 'name',
        },
      ],
    };
    wrapper = mount(<DropdownForm {...props} />);
  });
  it('should render dropdown form component without crashing', () => {
    wrapper.find('input').prop('onChange');
    expect(wrapper.find('input').length).toEqual(1);
    expect(wrapper.find('DropdownForm').length).toEqual(1);
  });
});
