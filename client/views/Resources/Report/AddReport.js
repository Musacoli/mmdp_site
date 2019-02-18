import React from 'react';
import Templates from '../../Templates';
import ReportFormContainer from '../../../containers/Resources/Report/ReportForm';

const AddReportView = ({ ...props }) => (
  <Templates {...props} title="Add Report">
    <ReportFormContainer mode="add" {...props} />
  </Templates>
);

export default AddReportView;
