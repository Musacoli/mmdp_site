/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import ThematicPillarsForm from '../../../components/common/Form/ThematicPillarsForm';

const props = {
  placeholder: '',
  editADropdown: jest.fn(),
  className: '',
  item: {
    pillarTitle: 'Title',
    error: { thematicPillars: '' },
  },
};

const wrapper = mount(<ThematicPillarsForm {...props} />);

const input = () => wrapper.find('input');

// const searchBtn = () => wrapper.find('button');

describe('<ThematicPillarsForm /> ', () => {
  it('should render without crashing', () => {
    expect(() => mount(<ThematicPillarsForm {...props} />)).not.toThrow();
  });

  it('should trigger onChange when user types', () => {
    input()
      .at(0)
      .simulate('change', { target: { value: 'My search' } });
    expect(props.editADropdown).toBeCalledTimes(1);
  });

  it('should have the classes passed via className', () => {
    wrapper.setProps({ className: 'foo-bar' });
    expect(wrapper.props().className).toContain('foo-bar');
  });
});
