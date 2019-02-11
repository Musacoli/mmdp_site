import React from 'react';
import { shallow } from 'enzyme';
import BeneficiaryServicesView from '../../../views/Stakeholders/addBeneficiaryServices';

describe('<BeneficiaryServicesView /> ', () => {
  it('renders the add basic information view without crashing', () => {
    shallow(<BeneficiaryServicesView />);
  });
});
