import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { CreateEvent } from '../../../containers/events/event';

describe('<Add Events /> ', () => {
  const props = {
    state: {
      title: '',
      details: '',
      eventDate: '',
      mainEvent: false,
      ImageName: '',
    },
  };

  const response = {
    adding: true,
  };
  const wrapper = shallow(
    <CreateEvent addEvents={jest.fn} response={response} state={props} />,
    new ReactRouterEnzymeContext(),
  );

  const event = {
    preventDefault: jest.fn(),
    target: {
      name: 'title',
      value: 'This is My Title',
      checked: true,
      files: ['File'],
    },
  };
  const eventCheckboxIsFalse = {
    preventDefault: jest.fn(),
    target: {
      name: 'title',
      value: 'This is My Title',
      checked: false,
      files: ['File'],
    },
  };
  it('renders Add Events conatiner without crashing', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('', () => {
    wrapper.instance().handleEditorInputChange('Editor Text');
    wrapper.instance().handleInputChange(event);
    wrapper.instance().handleCheckbox(event);
    wrapper.instance().handleCheckbox(eventCheckboxIsFalse);
    wrapper.instance().handleSubmit(event);
    wrapper.instance().handleDate(event, '2009-10-10');
    wrapper.instance().fileChangedHandler(event);
  });
});
