/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import GroupButtons from '../../../components/common/GroupButtons';

const wrapper = mount(<GroupButtons />);

describe('<GroupButtons /> ', () => {
  it('renders GroupButtons properly', () => {
    expect(wrapper.find('Container').length).toBe(1);
  });
});
