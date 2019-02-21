import React from 'react';
import Templates from '../../Templates';
import ListResearchContainer from '../../../containers/Resources/Research/ListResearch';

const ListResearch = ({ ...props }) => (
  <Templates {...props} title="Research">
    <ListResearchContainer {...props} />
  </Templates>
);

export default ListResearch;
