import React from 'react';
import Template from '../Templates';
import Group from '../../containers/Group/GroupForm';

const GroupFormView = ({ ...props }) => (
  <Template {...props} title="Update Group">
    <Group {...props} />
  </Template>
);

export default GroupFormView;
