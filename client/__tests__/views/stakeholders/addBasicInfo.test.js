import React from 'react';
import { shallow } from 'enzyme';
import AddStakeholderView from '../../../views/Stakeholders/addBasicInfo';

describe('<AddStakeholderView /> ', () => {
  it('renders the add basic information view without crashing', () => {
    shallow(<AddStakeholderView />);
  });
});
