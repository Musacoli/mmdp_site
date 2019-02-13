import React from 'react';
import { mount } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import toJson from 'enzyme-to-json';
import { EdoStateApproach } from '../../containers/About/EdoStateApproach';

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

const validData = {
  theEdoStateApproach: 'to tell you about the edo state approach',
  background: 'to give you some back ground info on the state approach',
};

const component = (
  <EdoStateApproach
    {...props}
    isValidData={func}
    change={func}
    submit={func}
    handleEditorChange={func}
  />
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
    wrapper
      .find('MarkdownEditor')
      .at(0)
      .prop('handleEditorChange')('value');
    wrapper
      .find('MarkdownEditor')
      .at(1)
      .prop('handleEditorChange')('value');
    wrapper
      .find('MarkdownEditor')
      .at(0)
      .simulate('change');
    wrapper
      .find('MarkdownEditor')
      .at(1)
      .simulate('change');
    wrapper.setState({
      theEdoStateApproach: 'theEdoStateApproach',
      id: '1234',
      updateMode: true,
    });
    wrapper.find('form').simulate('submit');
    wrapper.find('Button').simulate('click');
    wrapper.instance().submit({ preventDefault: func });
    wrapper
      .instance()
      .handleEditorChange('theEdoStateApproach', 'theEdoStateApproach');
    wrapper.instance().handleEditorChange('background', 'background');
    wrapper
      .instance()
      .handleEditorChange(
        'theEdoStateApproach',
        'this is theEdoStateApproach information',
      );
    wrapper
      .instance()
      .handleEditorChange('background', 'this is a background information');
  });
  wrapper.instance().setState({ ...validData, updateMode: true });
  expect(wrapper.instance().isValidData(props.edoStateApproach)).toBe(false);
  expect(wrapper.instance().isValidData(validData)).toBe(true);
  wrapper.instance().submit({ preventDefault: func });
});
