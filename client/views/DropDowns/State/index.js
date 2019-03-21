import React from 'react';
import Templates from '../../Templates';
import State from '../../../containers/DropDowns/State';

const StateView = ({ ...props }) => (
  <Templates {...props} title="Edit State Dropdown">
    <State {...props} />
  </Templates>
);

export default StateView;
