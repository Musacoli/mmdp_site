import React from 'react';
import Templates from '../../Templates';
import Community from '../../../containers/DropDowns/Community';

const CommunityView = ({ ...props }) => (
  <Templates {...props} title="Edit Community Dropdown">
    <Community {...props} />
  </Templates>
);

export default CommunityView;
