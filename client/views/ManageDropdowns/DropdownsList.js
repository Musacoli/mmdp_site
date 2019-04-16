import React from 'react';
import Templates from '../Templates';
/* eslint-disable import/no-named-as-default */
import Dropdowns from '../../containers/ManageDropdowns/DropdownsList';

const AddReportView = ({ ...props }) => (
  <Templates {...props} title="Dropdowns List">
    <Dropdowns {...props} />
  </Templates>
);

export default AddReportView;
