/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import EventForm from '../../../components/events/EventForm';

describe('Events list component', () => {
  const defaults = {
    title: '',
  };
  it('should render correctly', () => {
    shallow(
      <EventForm
        defaults={defaults}
        handleUpload={jest.fn}
        eventDate="2009-10-10"
        handleInputChange={jest.fn}
        handleSubmit={jest.fn}
        handleEditorInputChange={jest.fn}
        handleCheckbox={jest.fn}
        handleDate={jest.fn}
        ImageName=""
        header=""
        loading={false}
      />,
    );
  });
});
