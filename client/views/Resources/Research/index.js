import React from 'react';
import Template from '../../Templates';
import AddResearch from '../../../containers/Resources/Research';

const ResearchView = ({ ...props }) => (
  <Template {...props} title="Add research">
    <AddResearch {...props} />
  </Template>
);

export default ResearchView;
