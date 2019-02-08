/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import EventCard from '../../../components/events/EventCard';

describe('Events list component', () => {
  const event = {
    eventDate: '2019-01-14T21:00:00.000Z',
    title: 'Teencode is fun',
    details: 'Test details',
    headerImage: 'https://mmdp-img-assets.s3.ama',
  };

  it('should render correctly', () => {
    shallow(
      <EventCard props={event} headerImage="" eventDate="" title="" _id="" />,
    );
  });
});
