import React from 'react';
import { mount } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import TextInput from '../../../containers/Resources/StakeHolders/addStakeholder/textInput';

describe('text input component', () => {
  const fn = jest.fn();

  const props = {
    placeholder: '',
    label: '',
    onChange: fn,
    nameValue: 'test',
    data: {
      test: '',
    },
  };

  const onChange = (evt, { name, value }) => {
    props.data[name] = value;
  };

  const wrapper = mount(<TextInput {...props} />);
  const wrapper2 = mount(
    <TextInput {...props} isRequired onChange={onChange} />,
    new ReactRouterEnzymeContext(),
  );
  it('should render correctly', () => {
    expect(wrapper.find('FormField').length).toEqual(1);
  });
  it('should update the data by calling onChange', () => {
    wrapper.find('input').simulate('change', { target: { value: 'text' } });
    expect(fn).toHaveBeenCalled();
  });
  it('should have an error if email field is not valid', () => {
    wrapper2
      .find('input')
      .simulate('change', { target: { value: 'some text' } });
    props.isRequired = true;
    props.type = 'email';
    wrapper2.setProps(props);
    wrapper2.update();
    expect(wrapper2.state('value')).toBe('some text');
    expect(wrapper2.state('isError')).toBe(true);
  });

  it('should have an empty value if the field is disabled ', () => {
    wrapper2.setProps({ isDisabled: true });
    wrapper2.update();
    expect(props.data.test).toEqual('some text');
  });
});
