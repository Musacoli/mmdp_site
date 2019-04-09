import React from 'react';
import Templates from '../../Templates';
import LGAMap from '../../../containers/Matrix/LGAMap';

const StateSVGView = ({ ...props }) => (
  <Templates {...props} title="State Level">
    <LGAMap {...props} />
  </Templates>
);

export default StateSVGView;
