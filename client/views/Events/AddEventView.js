import React from 'react';
import Template from '../Templates';
import AddEvent from '../../containers/events/event';

const AddEventView = ({ ...props }) => (
  <Template {...props} title="Add Event">
    <AddEvent {...props} />
  </Template>
);

export default AddEventView;
