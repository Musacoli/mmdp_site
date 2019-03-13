import React from 'react';
import Templates from '../Templates';
import CountryDropDown from '../../containers/DropDowns/Country';

const Country = ({ ...props }) => (
  <Templates {...props} title="Edit drop down">
    <CountryDropDown {...props} />
  </Templates>
);

export default Country;
