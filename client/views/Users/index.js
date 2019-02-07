import React from 'react';
import UserAdd from '../../containers/Users/AddUser';
import UsersView from '../../containers/Users/ViewUsers';
import Template from '../Templates';

const AddUserView = ({ ...props }) => (
  <Template {...props} title="New user">
    <UserAdd {...props} />
  </Template>
);

export const EditUserView = ({ ...props }) => (
  <Template {...props} title="Users">
    <UsersView {...props} />
  </Template>
);

export default AddUserView;
