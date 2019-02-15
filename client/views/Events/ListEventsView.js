import React from 'react';
import Template from '../Templates';
import ListEvent from '../../containers/events/eventsList';

const AddEventView = ({ ...props }) => (
  <Template {...props} title="Events">
    <ListEvent {...props} />
  </Template>
);

export default AddEventView;
