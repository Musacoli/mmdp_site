/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import TitleContent from '../../../components/Sidebar/TitleContent';

const sidebarMenuItems = [
  { name: 'item 1', path: '/item-1' },
  { name: 'item 2', path: '/item-2' },
];
const onClick = () => {};
describe('<TitleContent /> ', () => {
  it('renders TitleContent component without crashing', () => {
    shallow(<TitleContent title="title" items={sidebarMenuItems} active onClick={onClick} />);
  });

  it('renders TitleContent with inactive sidebar crashing', () => {
    shallow(<TitleContent title="title" items={sidebarMenuItems} active={false} onClick={onClick} />);
  });
});
