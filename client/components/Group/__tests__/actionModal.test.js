/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import ActionButton from '../ActionModal';

const content = 'confirm delete';
const wrapper = mount(
  <ActionButton triggerText={content} header={content} content={content} />,
);

describe('<ActionButton /> ', () => {
  it('renders ActionButton component without crashing', () => {
    let node = wrapper.find('.show');
    node.simulate('click');

    node = wrapper.find('#actionModal-no-button').at(0);

    node.simulate('click');
    wrapper.instance().delete({});
  });
});
