/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import Sidebar from '../../../components/Sidebar';
import { sidebarItems } from '../../../containers/Sidebar/sidebarItems';

const func = () => {};
const wrapper = mount(<Sidebar goTo={func} sidebarItems={sidebarItems} activeIndex={1} />);

describe('<Sidebar /> ', () => {
  it('renders Sidebar component without crashing', () => {
    wrapper.find('.title.item');
  });
});
