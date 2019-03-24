import React from 'react';
import Templates from '../../Templates';
import Country from '../../../containers/DropDowns/Country';

const CountryDropDown = ({ ...props }) => (
  <Templates {...props} title="Edit Country Dropdown">
    <Country {...props} />
  </Templates>
);

export default CountryDropDown;
