import React from 'react';
import Templates from '../../Templates';
/* eslint-disable import/no-named-as-default */
import DocumentList from '../../../containers/Resources/Document/DocumentList';

const AddReportView = ({ ...props }) => (
  <Templates {...props} title="Documents">
    <DocumentList {...props} />
  </Templates>
);

export default AddReportView;
