import React from 'react';
import Templates from '../../Templates';
import StateSVG from '../../../containers/Matrix/StateSVG';

const StateSVGView = ({ ...props }) => (
  <Templates {...props} title="State Level">
    <StateSVG {...props} />
  </Templates>
);

export default StateSVGView;
