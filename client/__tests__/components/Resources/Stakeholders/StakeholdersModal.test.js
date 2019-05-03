import React from 'react';
import { mount } from 'enzyme';
import StakeholderModalItem from '../../../../components/Resources/Stakeholders/StakeholderModalItem';

describe('Stakeholder Modal Item', () => {
  const props = {
    entry: {
      key1: '',
      key2: '',
    },
  };
  it('should load correctly ', () => {
    const wrapper = mount(<StakeholderModalItem {...props} />);
    expect(wrapper.find('GridColumn').length).toEqual(1);
  });
});
