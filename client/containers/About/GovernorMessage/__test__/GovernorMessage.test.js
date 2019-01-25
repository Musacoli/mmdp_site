import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { GovernorMessage } from '..';
import toJson from 'enzyme-to-json';
import store from '../../../../store';

const func = jest.fn();

const props = {
  message: {
    governorName: "",
    governorPhoto: "",
    governorMessage: "",
    fileName: "",
    error: null,
    id: null,
    loading: false,
    updateMode: false,
  },
  updateGovernorMessage: () => {},
  getGovernorMessage: () => {},
  createGovernorMessage: () => {}
}

const component = (   
    <GovernorMessage {...props} isValidData={func} change={func} submit={func} handleEditorChange={func}/>
);

const wrapper =  mount(component, new ReactRouterEnzymeContext());;

describe('GovernorMessage', () => {

  it('should render properly', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('renders GovernorMessage component without crashing', () => {
    wrapper.find('MarkdownEditor').prop('handleEditorChange')('value');
    wrapper.find('TextInput').prop('change')({ target: { name: 'governorName', value: 'mr governor'} });
    wrapper.find('FileInput').prop('change')({ target: { name: 'governorPhoto', files: [{filename: ''}]} });
    wrapper.find('TextInput').simulate('change');
    wrapper.find('FileInput').simulate('change');
    wrapper.find('MarkdownEditor').simulate('change');
    wrapper.find('form').simulate('submit');
    wrapper.find('button').simulate('click');
    wrapper.find('SectionTitle').simulate('click');
    wrapper.instance().handleEditorChange('this is a background information');
    wrapper.instance().change({ target: { name: 'governorName', value: 'mr governor' } });
    wrapper.instance().change({ target: { name: 'GovernorMessage', value: 'this is a message from mr governor' } });
  });


});
