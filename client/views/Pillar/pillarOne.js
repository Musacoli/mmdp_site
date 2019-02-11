import React from 'react';
import Template from '../Templates';
import PillarOneContainer from '../../containers/Pillar/pillarOne';

const PillarOneView = ({ ...props }) => (
  <Template {...props} title="Pillar 1">
    <PillarOneContainer {...props} />
  </Template>
);

export default PillarOneView;
