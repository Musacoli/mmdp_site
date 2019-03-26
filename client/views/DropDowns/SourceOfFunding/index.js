import React from 'react';
import Templates from '../../Templates';
import SourceOfFunding from '../../../containers/DropDowns/SourceOfFunding';

const FundingView = ({ ...props }) => (
  <Templates {...props} title="Edit source of funding Dropdown">
    <SourceOfFunding {...props} />
  </Templates>
);

export default FundingView;
