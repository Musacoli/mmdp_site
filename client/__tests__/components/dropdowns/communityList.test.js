import React from 'react';
import { mount } from 'enzyme';
import CommunityList from '../../../components/DropDowns/CommunityList';

describe('Community List component', () => {
  const props = {
    wards: [],
    dropdowns: [
      {
        wardId: '23232323',
        communityName: 'community',
        description: 'description',
      },
    ],
    addTempCommunity: jest.fn(),
    handleSubmit: jest.fn(),
    loading: false,
    errors: {},
  };
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<CommunityList {...props} />);
  });
  it('should render community list component', () => {
    expect(wrapper.length).toBe(1);
  });
});
