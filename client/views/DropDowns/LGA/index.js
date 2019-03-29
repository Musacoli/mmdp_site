import React from 'react';
import Templates from '../../Templates';
import LGA from '../../../containers/DropDowns/LGA';

const LGAView = ({ ...props }) => (
  <Templates {...props} title="Edit LGA Dropdown">
    <LGA {...props} />
  </Templates>
);

export default LGAView;
