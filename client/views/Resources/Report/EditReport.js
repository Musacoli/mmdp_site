import React from 'react';
import Templates from '../../Templates';
import ReportFormContainer from '../../../containers/Resources/Report/ReportForm';

const EditReportView = ({ ...props }) => (
  <Templates {...props} title="Edit Report">
    <ReportFormContainer mode="edit" {...props} />
  </Templates>
);

export default EditReportView;
