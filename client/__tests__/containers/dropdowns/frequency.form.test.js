import React from 'react';
import { mount } from 'enzyme';
import FrequencyOption from '../../../components/common/Form/DropdownForm/index';

describe('<FrequencyOption />', () => {
  let wrapper;
  let props;
  const frequencyValue = 'RedCross';
  beforeEach(() => {
    props = {
      fetchFrequency: jest.fn(),
      editFrequency: jest.fn(),
      deleteFrequency: jest.fn(),
      item: {
        classification: 'Weekly',
        description: 'asdfasdf',
        frequencyValue,
        __v: 0,
        _id: '5c90de765a04a53d87040c5e',
      },
      loading: false,
      dropdowns: [
        {
          classification: 'Weekly',
          description: 'asdfasdf',
          frequencyValue,
          __v: 0,
          _id: '5c90de765a04a53d87040c5e',
        },
        {
          classification: 'Weekly',
          description: 'asdfasdf',
          frequencyValue,
          __v: 0,
          id: '5c90de765a04a53d87040c5e',
        },
      ],
    };
    wrapper = mount(<FrequencyOption {...props} />);
  });
  it('should render frequency options component without crashing', () => {
    expect(wrapper.find('DropdownForm').length).toEqual(1);
  });
});
