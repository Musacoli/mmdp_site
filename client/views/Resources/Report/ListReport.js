import React from 'react';
import Templates from '../../Templates';
import ListReportContainer from '../../../containers/Resources/Report/ListReport';

const ListReport = ({ ...props }) => (
  <Templates {...props} title="Reports">
    <ListReportContainer {...props} />
  </Templates>
);

export default ListReport;
