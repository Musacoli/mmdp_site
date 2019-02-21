import React from 'react';
import Templates from '../../Templates';
import EditResearchContainer from '../../../containers/Resources/Research/EditResearch';

const EditResearchView = ({ ...props }) => (
  <Templates {...props} title="Edit Research">
    <EditResearchContainer {...props} />
  </Templates>
);

export default EditResearchView;
