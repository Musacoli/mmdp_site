/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import Sidebar from '../../../components/Sidebar';
import { sidebarItems } from '../../../containers/Sidebar/sidebarItems';

const func = () => {};
const props = {
  goTo: func,
  title: 'hello',
  sidebarItems,
  activeIndex: 1,
  children: <div>hello</div>,
};
const wrapper = mount(
  <Sidebar {...props}>
    <div>Hello world</div>
  </Sidebar>,
);

describe('<Sidebar /> ', () => {
  it('renders Sidebar component without crashing', () => {
    wrapper.find('.title.item');
  });
});
