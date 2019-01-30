/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import ActionModal from '../../../components/Group/ActionModal';

const content = 'confirm delete';
const wrapper = mount(<ActionModal triggerText={content} header={content} content={content} />);

describe('<ActionModal /> ', () => {
  it('renders ActionModal component without crashing', () => {
    let node = wrapper.find('.show');
    node.simulate('click');

    node = wrapper.find('#actionModal-no-button').at(0);

    node.simulate('click');
    wrapper.instance().delete({});
  });
});
