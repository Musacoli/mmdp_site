import React from 'react';
import Templates from '../../Templates';
import AmounntInvestedOption from '../../../containers/DropDowns/AmountInvested';

const AmountInvestedView = ({ ...props }) => (
  <Templates {...props} title="Edit Amount Invested Range Dropdown">
    <AmounntInvestedOption {...props} />
  </Templates>
);

export default AmountInvestedView;
