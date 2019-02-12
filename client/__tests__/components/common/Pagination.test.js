/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import Pagination from '../../../components/common/Pagination';

const data = {
  total: 8,
  currentPage: 1,
  totalPages: 2,
  previous: false,
  next: 2,
};

const props = {
  data,
  handlePageChange: jest.fn(),
  className: '',
};

const wrapper = mount(<Pagination {...props} />);

const prevBtn = () => wrapper.find('button').at(0);

const nextBtn = () => wrapper.find('button').at(1);

describe('<Pagination /> ', () => {
  it('should render without crashing', () => {
    expect(() => mount(<Pagination {...props} />)).not.toThrow();
  });

  it('should disable prev button if there are no previous pages', () => {
    wrapper.setProps({ data: { ...data, previous: false } });
    expect(prevBtn().hasClass('disabled')).toEqual(true);
  });

  it('should disable next button if there are no next pages', () => {
    wrapper.setProps({ data: { ...data, next: false } });
    expect(nextBtn().hasClass('disabled')).toEqual(true);
  });

  it('should invoke handlePageChange correctly', () => {
    wrapper.setProps({ data: { ...data, previous: 3 } });
    prevBtn().simulate('click');
    expect(props.handlePageChange).toHaveBeenNthCalledWith(1, 3);

    wrapper.setProps({ data: { ...data, next: 2 } });
    nextBtn().simulate('click');
    expect(props.handlePageChange).toHaveBeenNthCalledWith(2, 2);
  });

  it('should show correct pages', () => {
    wrapper.setProps({ data: { ...data, currentPage: 5, totalPages: 10 } });
    expect(wrapper.html()).toContain('5', '10');
  });

  it('should have the classes passed via className', () => {
    wrapper.setProps({ className: 'foo-bar' });
    expect(wrapper.props().className).toContain('foo-bar');
  });

  it('should render nothing when there is no data', () => {
    wrapper.setProps({ data: { ...data, total: 0 } });
    expect(wrapper.html()).toEqual(null);
  });
});
