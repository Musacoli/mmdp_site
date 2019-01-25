import React from 'react';
import Template from '../Templates';
import Group from '../../containers/Group';

const GroupView = ({ ...props }) => (
  <Template {...props} title="Group">
    <Group {...props} />
  </Template>
);

export default GroupView;
