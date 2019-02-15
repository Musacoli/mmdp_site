import React from 'react';
import Template from '../Templates';
import PillarThreeContainer from '../../containers/Pillar/pillarThree';

const PillarThreeView = ({ ...props }) => (
  <Template {...props} title="Pillar 3">
    <PillarThreeContainer {...props} />
  </Template>
);

export default PillarThreeView;
