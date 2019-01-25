/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import GroupForm from '../GroupForm';

const testText = 'name';
const testFunc = jest.fn();
const props = {
  options: [{ value: testText, label: testText }],
  name: testText,
  selectedOption: [],
  handleSelectChange: testFunc,
  handleInputChange: testFunc,
  busy: true,
  handleSubmit: testFunc,
  errors: { name: testText },
  serverError: testText,
  success: true,
  groupId: '',
};


const wrapper = mount(<GroupForm {...props} />);

describe('<GroupForm /> ', () => {
  it('renders GroupForm component without crashing', () => {
    let node = wrapper.find('#name').simulate(
      'change',
      {
        target:
           { name: 'name', value: testText },
      },
    );
    expect(node.instance().value).toEqual(testText);
    node = wrapper.find('.primary .color-blue');
    node.simulate('click');
    props.groupId = '123ert76';
    mount(<GroupForm {...props} />);
  });
});
