import React from 'react';
import Templates from '../../Templates';
/* eslint-disable import/no-named-as-default  */
import AddDocument from '../../../containers/Resources/Document/MediaForm';

const AddReportView = ({ ...props }) => (
  <Templates {...props} title="Add Media">
    <AddDocument {...props} />
  </Templates>
);

export default AddReportView;
