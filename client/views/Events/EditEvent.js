import React from 'react';
import Template from '../Templates';
import EditEvent from '../../containers/events/editEvents';

const EditEventView = ({ ...props }) => (
  <Template {...props} title="Edit Event">
    <EditEvent {...props} />
  </Template>
);

export default EditEventView;
