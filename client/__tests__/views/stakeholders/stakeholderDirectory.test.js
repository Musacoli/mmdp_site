import React from 'react';
import { shallow } from 'enzyme';
import StakeholdersView from '../../../views/Stakeholders/stakeholderDirectory';

describe('<StakeholdersView /> ', () => {
  it('renders the add basic information view without crashing', () => {
    shallow(<StakeholdersView />);
  });
});
