/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import DropdownButton from "../ActionButtons";

const wrapper = mount(<DropdownButton />);

describe('<DropdownButton /> ', () => {
  it('renders DropdownButton properly', () => {
    expect(wrapper.find('DropdownButton').length).toBe(1);
  });
});
