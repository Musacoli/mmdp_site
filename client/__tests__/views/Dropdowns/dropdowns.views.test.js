/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import PartnershipType from '../../../views/DropDowns/PartnershipType';
import State from '../../../views/DropDowns/State';
import RegistrationStatus from '../../../views/DropDowns/RegistrationStatus';

const dropdowns = [
  { component: PartnershipType },
  { component: State },
  { component: RegistrationStatus },
];

describe('Dropdowns View ', () => {
  dropdowns.map((Dropdown) => {
    return it(`renders ${Dropdown} component without crashing`, () => {
      shallow(<Dropdown.component />);
    });
  });
});
