/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import  Usersrows from './../TableRows';

const wrapper = mount(<Usersrows />);

describe('<Usersrows /> ', () => {
  it('renders Usersrows component with the necessary rows', () => {
    expect(wrapper.find('TableRow').length).toBe(1);
  });
});
