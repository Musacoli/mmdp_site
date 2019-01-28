/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import  SearchSection from '..';

const wrapper = mount(<SearchSection />);

describe('<SearchSection /> ', () => {
  it('renders SearchSection component without crashing', () => {
    expect(wrapper.find('Container').length).toBe(1);
  });
});
