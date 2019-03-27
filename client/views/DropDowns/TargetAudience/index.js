import React from 'react';
import Templates from '../../Templates';
import TargetAudienceForm from '../../../containers/DropDowns/TargetAudience/index';

const TargetAudienceView = ({ ...props }) => (
  <Templates {...props} title="Edit Target Audience Dropdown">
    <TargetAudienceForm {...props} />
  </Templates>
);

export default TargetAudienceView;
