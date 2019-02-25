import React from 'react';
import { shallow } from 'enzyme';
import ViewStakeholders from '../../../views/Resources/Stakeholders/ViewStakeholders';

describe('View stakeholders', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ViewStakeholders />);
    expect(wrapper).toMatchSnapshot();
  });
});
