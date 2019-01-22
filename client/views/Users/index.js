import React from 'react';
import AddUser from '../../containers/Users/AddUser';
import UsersView from '../../containers/Users/ViewUsers';
import Template from '../Templates';

const AddUserView = ({ ...props }) => (
  <Template { ...props } title="New user">
    <AddUser {...props}/>
  </Template>
);

export const EditUserView = ({ ...props }) => (
  <Template { ...props } title="Users">
    <UsersView {...props}/>
  </Template>
);


export default AddUserView;
