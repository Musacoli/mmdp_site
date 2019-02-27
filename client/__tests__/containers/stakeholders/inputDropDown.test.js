import React from 'react';
import _ from 'lodash';
import { mount } from 'enzyme';
import InputDropDown from '../../../containers/Resources/StakeHolders/addStakeholder/inputDropDown';
import { getOptions } from '../../common/stakeholders/dataGenerationFixtures';

describe('Input Dropdown', () => {
  let props = {};
  const onChange = (evt, { name, value }) => {
    props.data[name] = value;
  };
  const options = getOptions(1);

  props = {
    placeholder: '',
    options,
    label: '',
    onChange,
    nameValue: 'test',
    data: {
      test: '',
    },
  };
  const wrapper = mount(<InputDropDown {...props} />);
  it('should mount correctly', () => {
    expect(wrapper.find('Dropdown').length).toEqual(1);
  });
  it('should update on change', () => {
    wrapper.find('Dropdown').simulate('click');
    wrapper.find('DropdownItem').simulate('click');

    expect(props.data.test).toEqual(options[0].value);
  });

  it('should update on change for multiple fields', () => {
    props.selectsMultiple = true;
    props.data.test = [];
    const nativeEvent = { nativeEvent: { stopImmediatePropagation: _.noop } };
    wrapper.setProps(props);
    wrapper.find('Dropdown').simulate('click');
    wrapper.find('DropdownItem').simulate('click', nativeEvent);

    expect(props.data.test).toEqual([options[0].value]);
  });
});
