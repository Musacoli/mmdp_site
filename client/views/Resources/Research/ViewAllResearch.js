import React from 'react';
import Templates from '../../Templates';
import ViewResearch from '../../../containers/Resources/Research/ViewAllResearch';

const ViewAllResearches = ({ ...props }) => (
  <Templates {...props} title="Research">
    <ViewResearch {...props} />
  </Templates>
);

export default ViewAllResearches;
