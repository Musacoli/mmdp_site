/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import Search from '../../../components/common/Search';

const props = {
  placeholder: '',
  onChange: jest.fn(),
  onSearch: jest.fn(),
  className: '',
};

const wrapper = mount(<Search {...props} />);

const input = () => wrapper.find('input');

const searchBtn = () => wrapper.find('button');

describe('<Search /> ', () => {
  it('should render without crashing', () => {
    expect(() => mount(<Search {...props} />)).not.toThrow();
  });

  it('should display the input placeholder text', () => {
    wrapper.setProps({ placeholder: 'Search items' });
    expect(input().props().placeholder).toEqual('Search items');
  });

  it('should trigger onChange when user types', () => {
    input().simulate('change', { target: { value: 'My search' } });
    expect(props.onChange).toHaveBeenNthCalledWith(1, 'My search');
  });

  it('should correctly trigger onSearch when user clicks search', () => {
    wrapper.setState({ search: 'My query' });
    searchBtn().simulate('click');
    expect(props.onSearch).toHaveBeenNthCalledWith(1, 'My query');
  });

  it('should have the classes passed via className', () => {
    wrapper.setProps({ className: 'foo-bar' });
    expect(wrapper.props().className).toContain('foo-bar');
  });
});
