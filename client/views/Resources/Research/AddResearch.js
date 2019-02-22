import React from 'react';
import Templates from '../../Templates';
import AddResearches from '../../../containers/Resources/Research/Addresearch';

const DocoumentAddFormView = ({ ...props }) => (
  <Templates {...props} title="Add Research">
    <AddResearches {...props} />
  </Templates>
);

export default DocoumentAddFormView;
