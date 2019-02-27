import React from 'react';
import { mount } from 'enzyme';
import StakeholderModalItem from '../../../../components/Resources/Stakeholders/StakeholderModalItem';

describe('Stakeholder Modal Item', () => {
  let wrapper;
  const props = {
    entry: [],
  };
  it('should load correctly ', () => {
    wrapper = mount(<StakeholderModalItem {...props} />);
    expect(wrapper.find('GridColumn').length).toEqual(1);
  });
});
