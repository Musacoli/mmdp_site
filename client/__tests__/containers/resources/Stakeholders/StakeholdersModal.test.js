import React from 'react';
import { mount } from 'enzyme';
import StakeholderModal from '../../../../containers/Resources/StakeHolders/StakeholdersModal/StakeholderModal';
import { returnStakeholders } from './StakeholdersList.test';

describe('StakeholdersModal', () => {
  let wrapper;

  const props = {
    trigger: <button type="button" />,
    item: returnStakeholders(),
  };

  beforeEach(() => {
    wrapper = mount(<StakeholderModal {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper.find('Modal').length).toEqual(1);
  });

  it('should open cerrectly', () => {
    wrapper.find('button').simulate('click');
    expect(wrapper.find('GridRow').length).toEqual(7);
  });

  it('should close cerrectly', () => {
    wrapper.instance().handleClose();
    expect(wrapper.find('Modal').length).toEqual(1);
  });
});
