import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { EdoStateApproach } from '../../containers/About/EdoStateApproach';
import toJson from 'enzyme-to-json';
import store from '../../store';

const func = jest.fn();

const props = {
  edoStateApproach: {
    theEdoStateApproach: '',
    background: '',
    error: null,
    id: null,
    loading: false,
    updateMode: true,
  },
  updateEdoStateApproach: () => {},
  getEdoStateApproach: () => {},
  createEdoStateApproach: () => {},
};
const component = (
  <EdoStateApproach {...props} isValidData={func} change={func} submit={func} handleEditorChange={func} />
);

const wrapper = mount(component, new ReactRouterEnzymeContext());

describe('EdoStateApproach', () => {
  it('should render properly', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('renders EdoStateApproach component without crashing', () => {
    wrapper.setState({ theEdoStateApproach: 'theEdoStateApproach' });
    wrapper.state('theEdoStateApproach');
    wrapper.find('MarkdownEditor').at(0).prop('handleEditorChange')('value');
    wrapper.find('MarkdownEditor').at(1).prop('handleEditorChange')('value');
    wrapper.find('MarkdownEditor').at(0).simulate('change');
    wrapper.find('MarkdownEditor').at(1).simulate('change');
    wrapper.setState({ theEdoStateApproach: 'theEdoStateApproach', id: '1234', updateMode: true });
    wrapper.find('form').simulate('submit');
    wrapper.find('button').simulate('click');
    wrapper.find('SectionTitle').simulate('click');
    wrapper.instance().submit({ preventDefault: func });
    wrapper.instance().handleEditorChange('theEdoStateApproach', 'theEdoStateApproach');
    wrapper.instance().handleEditorChange('background', 'background');
    wrapper.instance().handleEditorChange('theEdoStateApproach', 'this is theEdoStateApproach information');
    wrapper.instance().handleEditorChange('background', 'this is a background information');
  });
});
