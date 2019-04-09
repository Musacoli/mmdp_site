import React from 'react';
import Templates from '../../Templates';
import FrequencyOption from '../../../containers/DropDowns/Frequency';

const FrequencyView = ({ ...props }) => (
  <Templates {...props} title="Edit frequency options">
    <FrequencyOption {...props} />
  </Templates>
);

export default FrequencyView;
