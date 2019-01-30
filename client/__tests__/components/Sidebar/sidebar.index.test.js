/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Sidebar from '../../../components/Sidebar';

const func = () => {};
const wrapper = mount(<Sidebar goTo={func} handleClick={func} activeIndex={1} />);

describe('<Sidebar /> ', () => {
  it('renders Sidebar component without crashing', () => {
    shallow(<Sidebar goTo={func} handleClick={func} activeIndex={1} />);
    wrapper.find('.title.item').map(item => item.simulate('click'));
  });
});
