/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import EventsList from '../../../components/events/EventsList';

describe('Events list component', () => {
  it('should render correctly', () => {
    const events = [];
    shallow(<EventsList events={events} handleDelete={jest.fn} />);
  });
});
