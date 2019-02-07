import React from 'react';
import Templates from '../../Templates';
import AddReportContainer from '../../../containers/Resources/Report/AddReport';

const AddReportView = ({ ...props }) => (
  <Templates {...props} title="Add Report">
    <AddReportContainer {...props} />
  </Templates>
);

export default AddReportView;
