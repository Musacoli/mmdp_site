import React from 'react';
import Templates from '../../Templates';
import Ward from '../../../containers/DropDowns/Ward';

const WardView = ({ ...props }) => (
  <Templates {...props} title="Edit Ward Dropdown">
    <Ward {...props} />
  </Templates>
);

export default WardView;
