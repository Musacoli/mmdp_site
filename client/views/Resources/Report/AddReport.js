import React from 'react';
import Templates from '../../Templates';
import AddReport from '../../../containers/Resources/Report/AddReport';


const AddReportView = ({ ...props }) => (
  <Templates {...props} title="Add Report">
    <AddReport {...props} />
  </Templates>
);

export default AddReportView;
