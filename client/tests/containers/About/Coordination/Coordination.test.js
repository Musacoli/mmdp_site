import React from 'react';
import { mount } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import toJson from 'enzyme-to-json';
import { Coordination } from '../../../../containers/About/Coordination';

const func = jest.fn();

const props = {
  coordination: {
    coordination: '',
    whatAreWeDoing: '',
    introToHighlights: '',
    highlight: [],
    highlightIds: [],
    error: null,
    id: null,
    loading: false,
    updateMode: false,
    numberOfInputFields: 0,
  },
  updateCoordination: () => {},
  getCoordination: () => {},
  createCoordination: () => {},
};
const component = (
  <Coordination
    {...props}
    isValidData={func}
    change={func}
    submit={func}
    addMoreInput={func}
    createMoreInputField={func}
    populateInputValue={func}
    handleEditorChange={func}
    getInputElement={func}
    inputHasValue={func}
    getHighlightInputValue={func}
  />
);

const validData = {
  coordination: 'this is a coordination',
  whatAreWeDoing: 'this is a whatAreWeDoing',
  introToHighlights: 'this is a introToHighlights',
  highlight: ['this is a highlight'],
};

const wrapper = mount(component, new ReactRouterEnzymeContext());

describe('Coordination', () => {
  it('should render properly', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('renders Coordination component without crashing', () => {
    wrapper.setState({ about: 'about' });
    wrapper.state('about');
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
      .at(2)
      .prop('handleEditorChange')('value');
    wrapper
      .find('MarkdownEditor')
      .at(0)
      .simulate('change');
    wrapper
      .find('MarkdownEditor')
      .at(1)
      .simulate('change');
    wrapper
      .find('MarkdownEditor')
      .at(2)
      .simulate('change');
    wrapper.find('form').simulate('submit');
    wrapper
      .find('Button')
      .at(0)
      .simulate('click');
    wrapper
      .find('Button')
      .at(1)
      .simulate('click');
    wrapper.instance().submit({ preventDefault: func });
    wrapper.instance().handleEditorChange('cordination', 'cordination');
    wrapper.instance().handleEditorChange('whatAreWeDoing', 'whatAreWeDoing');
    wrapper
      .instance()
      .handleEditorChange('introToHighlights', 'introToHighlights');
    wrapper.instance().setState(validData);
    wrapper.instance().submit({ preventDefault: func });
    expect(wrapper.instance().isValidData(props.coordination)).toBe(false);
    expect(wrapper.instance().isValidData(validData)).toBe(true);
  });
});
