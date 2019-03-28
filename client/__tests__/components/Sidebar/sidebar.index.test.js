/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import sidebarItems from '../../../containers/Sidebar/sidebarItems';

const func = () => {};
const props = {
  goTo: func,
  title: 'hello',
  sidebarItems: sidebarItems(),
  activeIndex: 1,
  children: <div>hello</div>,
};
const wrapper = mount(
  <Router>
    <Sidebar {...props}>
      <div>Hello world</div>
    </Sidebar>
  </Router>,
);

describe('<Sidebar /> ', () => {
  it('renders Sidebar component without crashing', () => {
    wrapper.find('.title.item');
  });
});
