import React from 'react';
import { mount } from 'enzyme';
import FormHeader from '../../../../components/Resources/Stakeholders/formHeader';

describe('it should load the FormHeader', () => {
  const props = {
    title: '',
    step: 1,
    pages: 2,
  };
  const wrapper = mount(<FormHeader {...props} />);
  it('should mount and load correctly', () => {
    expect(wrapper.find('.st-label').length).toEqual(1);
    expect(wrapper.find('.sh-title').length).toEqual(1);
  });
});
