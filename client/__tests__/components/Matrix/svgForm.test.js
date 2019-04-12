import React from 'react';
import { mount } from 'enzyme';
import SVGForm from '../../../components/Matrix/svgForm';

describe('SVGForm component', () => {
  const props = {
    onChange: jest.fn(),
    loading: false,
    onFormSubmit: jest.fn(),
    fileName: 'svgFile',
    country: '',
    errors: {},
  };
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<SVGForm {...props} />);
  });
  it('should render svgForm component', () => {
    expect(wrapper.length).toBe(1);
  });
  it('should have called onFormSubmit on click ', () => {
    expect(wrapper.find('button')).toBeDefined();
    wrapper.find('button').simulate('click');
    expect(wrapper.prop('onFormSubmit')).toHaveBeenCalled();
  });
  it('should have called OnChange(svg input) ', () => {
    const input = wrapper.find({ name: 'countrySvgFile' });
    const event = {
      target: { name: 'countrySvgFile', files: [{ name: 'sample' }] },
    };
    input.at(1).simulate('change', event);
    expect(wrapper.prop('onChange')).toHaveBeenCalled();
  });
  it('should have called OnChange(country name input) ', () => {
    const input = wrapper.find({ name: 'countryName' });
    const event = {
      target: { name: 'countryName', value: 'Kenya' },
    };
    input.at(1).simulate('change', event);
    expect(wrapper.prop('onChange')).toHaveBeenCalled();
  });
});
