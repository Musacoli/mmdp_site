import React from 'react';
import Templates from '../../Templates';
<<<<<<< HEAD
/* eslint-disable import/no-named-as-default */
=======
/* eslint-disable import/no-named-as-default  */
>>>>>>> feat(repository:documents): Implement document editing
import AddDocument from '../../../containers/Resources/Document';

const AddReportView = ({ ...props }) => (
  <Templates {...props} title="Add Document">
    <AddDocument {...props} />
  </Templates>
);

export default AddReportView;
