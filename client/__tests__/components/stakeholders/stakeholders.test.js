import React from 'react';
import { shallow } from 'enzyme';

import StakeholdersList from '../../../components/Stakeholders/stakeholders';

describe('Beneficiary services component', () => {
  it('should render correctly', () => {
    shallow(<StakeholdersList />);
  });
});
