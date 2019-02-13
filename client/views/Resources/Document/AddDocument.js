import React from 'react';
import Templates from '../../Templates';
import AddDocument from '../../../containers/Resources/Document';

const AddReportView = ({ ...props }) => (
  <Templates {...props} title="Add Document">
    <AddDocument {...props} />
  </Templates>
);

export default AddReportView;
