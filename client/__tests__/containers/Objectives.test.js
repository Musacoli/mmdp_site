import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { Objectives } from '../../containers/About/Objectives';
import toJson from 'enzyme-to-json';
import store from '../../store';

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
const component = (
  <Objectives {...props} isValidData={func} change={func} submit={func} handleEditorChange={func} />
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
    wrapper.find('MarkdownEditor').at(0).prop('handleEditorChange')('value');
    wrapper.find('MarkdownEditor').at(0).simulate('change');
    wrapper.setState({ objectives: 'objectives', id: '1234', updateMode: true });
    wrapper.find('form').simulate('submit');
    wrapper.find('button').simulate('click');
    wrapper.find('SectionTitle').simulate('click');
    wrapper.instance().submit({ preventDefault: func });
    wrapper.instance().handleEditorChange('objectives', 'objectives');
    wrapper.instance().handleEditorChange('objectives', 'this is an objectives information');
  });
});
