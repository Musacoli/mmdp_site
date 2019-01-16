import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { AboutMMDP } from '..';
import toJson from 'enzyme-to-json';
import store from '../../../../store';

const func = jest.fn();

const props = {
  aboutMMDP: {
    about: "",
    background: "",
    error: null,
    id: null,
    loading: false,
    updateMode: true,
  },
  updateAboutMMDP: () => {},
  getAboutMMDP: () => {},
  createAboutMMDP: () => {}
}
const component = (   
  <AboutMMDP {...props} isValidData={func} change={func} submit={func} handleEditorChange={func}/>
);

const wrapper =  mount(component, new ReactRouterEnzymeContext());;

describe('AboutMMDP', () => {

  it('should render properly', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('renders AboutMMDP component without crashing', () => {
    wrapper.setState({ about: 'about' });
    wrapper.state('about');
    wrapper.find('MarkdownEditor').at(0).prop('handleEditorChange')('value');
    wrapper.find('MarkdownEditor').at(1).prop('handleEditorChange')('value');
    wrapper.find('MarkdownEditor').at(0).simulate('change');
    wrapper.find('MarkdownEditor').at(1).simulate('change');
    wrapper.setState({ about: 'about', id: "1234", updateMode: true });
    wrapper.find('form').simulate('submit');
    wrapper.find('button').simulate('click');
    wrapper.find('SectionTitle').simulate('click');
    wrapper.instance().submit({ preventDefault: func });
    wrapper.instance().handleEditorChange('about', 'about');
    wrapper.instance().handleEditorChange('background', 'background');
    wrapper.instance().handleEditorChange('about', 'this is an about information');
    wrapper.instance().handleEditorChange('background', 'this is a background information');
  });


});
