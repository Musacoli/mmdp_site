import React from 'react';
import Templates from '../../Templates';
import FocusAreaOption from '../../../containers/DropDowns/FocusArea';

const FocusAreaView = ({ ...props }) => (
  <Templates {...props} title="Edit Focus Area options">
    <FocusAreaOption {...props} />
  </Templates>
);

export default FocusAreaView;
