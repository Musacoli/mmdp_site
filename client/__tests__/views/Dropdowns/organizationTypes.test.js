import React from 'react';
import { shallow } from 'enzyme';
import OrganizationTypeView from '../../../views/DropDowns/OrganizationType';

describe('<OrganizationTypeView /> ', () => {
  it('renders OrganizationTypeView component without crashing', () => {
    shallow(<OrganizationTypeView />);
  });
});
