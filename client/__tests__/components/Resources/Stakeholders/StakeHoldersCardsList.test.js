import React from 'react';
import { mount } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import stakehlderData from '../../../common/stakeholders/stakeholderTestData';
import StakeHoldersCardsList from '../../../../components/Resources/Stakeholders/StakeHoldersCardsList';

describe('StakeHoldersCardslist', () => {
  const data = stakehlderData.data;
  let props;
  let wrapper;

  it('should mount without crashing', () => {
    props = {
      items: [],
      removeStakeholder: () => {},
    };
    wrapper = mount(
      <StakeHoldersCardsList {...props} />,
      new ReactRouterEnzymeContext(),
    );
    expect(wrapper.find('EmptyView').length).toEqual(1);
  });

  it('should mount with multiple cards', () => {
    wrapper = mount(
      <StakeHoldersCardsList removeStakeholder={() => {}} items={data} />,
      new ReactRouterEnzymeContext(),
    );
    expect(wrapper.find('StakeHoldersCard').length).toEqual(1);
  });

  it('should mount with placeholderCards', () => {
    wrapper = mount(
      <StakeHoldersCardsList loading removeStakeholder={() => {}} items={[]} />,
      new ReactRouterEnzymeContext(),
    );
    expect(wrapper.find('Card').length).toEqual(6);
  });
});
