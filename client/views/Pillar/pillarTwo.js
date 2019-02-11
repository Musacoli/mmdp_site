import React from 'react';
import Template from '../Templates';
import PillarTwoContainer from '../../containers/Pillar/pillarTwo';

const PillarTwoView = ({ ...props }) => (
  <Template {...props} title="Pillar 2">
    <PillarTwoContainer {...props} />
  </Template>
);

export default PillarTwoView;
