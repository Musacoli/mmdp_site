import React from 'react';
import AddUser from '../../containers/Users/AddUser';
import Template from '../Templates';

const AddUserView = ({ ...props }) => (
  <Template { ...props } title="New user">
    <AddUser {...props}/>
  </Template>
);


export default AddUserView;
