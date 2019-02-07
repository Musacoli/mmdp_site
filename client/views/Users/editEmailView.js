import React from 'react';
import EmailEdit from '../../containers/Users/editEmail';
import Template from '../Templates';

const editEmailView = ({ ...props }) => (
  <Template {...props} title="Edit User Email">
    <EmailEdit {...props} />
  </Template>
);

export default editEmailView;
