import React from 'react';
import Template from '../Templates';
import PillarFourContainer from '../../containers/Pillar/pillarFour';

const PillarFourView = ({ ...props }) => (
  <Template {...props} title="Pillar 4">
    <PillarFourContainer {...props} />
  </Template>
);

export default PillarFourView;
