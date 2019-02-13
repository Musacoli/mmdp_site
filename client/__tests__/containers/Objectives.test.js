import React from 'react';
import { mount } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import toJson from 'enzyme-to-json';
import { Objectives } from '../../containers/About/Objectives';

const func = jest.fn();

const props = {
  objectives: {
    objectives: '',
    error: null,
    id: null,
    loading: false,
    updateMode: true,
  },
  updateObjectives: () => {},
  getObjectives: () => {},
  createObjectives: () => {},
};

const validData = {
  objectives: ' provided information to give you context on the about section',
};

const component = (
  <Objectives
    {...props}
    isValidData={func}
    change={func}
    submit={func}
    handleEditorChange={func}
  />
);

const wrapper = mount(component, new ReactRouterEnzymeContext());

describe('Objectives', () => {
  it('should render properly', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('renders Objectives component without crashing', () => {
    wrapper.setState({ objectives: 'objectives' });
    wrapper.state('objectives');
    wrapper
      .find('MarkdownEditor')
      .at(0)
      .prop('handleEditorChange')('value');
    wrapper
      .find('MarkdownEditor')
      .at(0)
      .simulate('change');
    wrapper.setState({
      objectives: 'objectives',
      id: '1234',
      updateMode: true,
    });
    wrapper.find('form').simulate('submit');
    wrapper.find('Button').simulate('click');
    wrapper.instance().submit({ preventDefault: func });
    wrapper.instance().handleEditorChange('objectives', 'objectives');
    wrapper
      .instance()
      .handleEditorChange('objectives', 'this is an objectives information');
  });
  wrapper.instance().setState({ ...validData, updateMode: true });
  expect(wrapper.instance().isValidData(props.objectives)).toBe(false);
  expect(wrapper.instance().isValidData(validData)).toBe(true);
  wrapper.instance().submit({ preventDefault: func });
});
