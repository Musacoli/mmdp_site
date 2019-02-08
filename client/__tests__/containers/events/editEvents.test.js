import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { EditEVent } from '../../../containers/events/editEvents';

describe('<Add Events /> ', () => {
  const match = {
    params: { id: 1 },
  };

  const eventData = {
    title: '',
    details: '',
    eventDate: '',
    mainEvent: false,
    ImageName: '',
  };

  const eventError = {
    message: 'Message',
  };

  const currentData = {
    headerImage: {},
  };

  const response = {
    adding: true,
  };

  const wrapper = shallow(
    <EditEVent
      eventError={eventError}
      eventData={eventData}
      match={match}
      getEvent={jest.fn}
      inputData={jest.fn}
      currentData={currentData}
      updateEvent={jest.fn}
      errrorDescription=""
      response={response}
    />,
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

  it('Except Wrapper To Have These Functions', () => {
    wrapper.instance().handleEditorInputChange('Editor Text');
    wrapper.instance().handleInputChange(event);
    wrapper.instance().handleCheckbox(event);
    wrapper.instance().handleCheckbox(eventCheckboxIsFalse);
    wrapper.instance().handleSubmit(event);
    wrapper.instance().handleDate(event, '2009-10-10');
    wrapper.instance().fileChangedHandler(event);
  });
});
