import React from 'react';
import { mount } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import toJson from 'enzyme-to-json';
import { GovernorMessage } from '../../../../containers/About/GovernorMessage';

const func = jest.fn();

const props = {
  message: {
    governorName: '',
    governorPhoto: '',
    governorMessage: '',
    fileName: '',
    error: null,
    id: null,
    loading: false,
    updateMode: false,
  },
  updateGovernorMessage: () => {},
  getGovernorMessage: () => {},
  createGovernorMessage: () => {},
};
const validData = {
  governorName: 'this is a governorName',
  governorMessage: 'this is a governorMessage',
  fileName: 'file.jpg',
};

const component = (
  <GovernorMessage
    {...props}
    isValidData={func}
    change={func}
    submit={func}
    handleEditorChange={func}
  />
);

const wrapper = mount(component, new ReactRouterEnzymeContext());

describe('GovernorMessage', () => {
  it('should render properly', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('renders GovernorMessage component without crashing', () => {
    wrapper.find('MarkdownEditor').prop('handleEditorChange')('value');
    wrapper.find('TextInput').prop('change')({
      target: { name: 'governorName', value: 'mr governor' },
    });
    wrapper.find('FileInput').prop('change')({
      target: { name: 'governorPhoto', files: [{ filename: '' }] },
    });
    wrapper.find('TextInput').simulate('change');
    wrapper.find('FileInput').simulate('change');
    wrapper.find('MarkdownEditor').simulate('change');
    wrapper.find('form').simulate('submit');
    wrapper.find('Button').simulate('click');
    wrapper.instance().handleEditorChange('this is a background information');
    wrapper
      .instance()
      .change({ target: { name: 'governorName', value: 'mr governor' } });
    wrapper.instance().change({
      target: {
        name: 'GovernorMessage',
        value: 'this is a message from mr governor',
      },
    });
    wrapper.instance().setState({ ...validData, updateMode: true });
    expect(wrapper.instance().isValidData(props.message)).toBe(false);
    expect(wrapper.instance().isValidData(validData)).toBe(true);
    wrapper.instance().submit({ preventDefault: func });
  });
});
