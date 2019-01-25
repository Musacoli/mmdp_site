/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import Sidebar from '..';

const func = () => {};
const wrapper = mount(<Sidebar goTo={func} handleClick={func} activeIndex={1} />);

describe('<Sidebar /> ', () => {
  it('renders Sidebar component without crashing', () => {
    wrapper.find('.title.item').map(item => item.simulate('click'));
  });
});
