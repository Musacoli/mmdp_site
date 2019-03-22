import React from 'react';
import Templates from '../../Templates';
import ThematicPillars from '../../../containers/DropDowns/ThematicPillars';

const ThematicPillarsView = ({ ...props }) => (
  <Templates {...props} title="Edit Thematic Pillar Dropdown">
    <ThematicPillars {...props} />
  </Templates>
);

export default ThematicPillarsView;
