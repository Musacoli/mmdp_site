import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import DropdownCard from '../../../components/ManageDropdowns/DropdownCard';

describe('<DropdownCard />', () => {
  const props = {
    fetchDropdowns: jest.fn(),
    dropdowns: [
      {
        model: 'PartnershipType',
        id: 16,
        title: 'Partnership Type',
        route: 'partnership-type',
        name: 'partnershiptype',
      },
      {
        model: 'OrganisationType',
        id: 17,
        title: 'Organization Type',
        route: 'organization-type',
        name: 'organizationtype',
      },
    ],
    goTo: jest.fn(),
    deleteDropdowns: jest.fn(),
    dropdown: {},
  };
  const wrapper = mount(
    <Provider store={store}>
      <DropdownCard {...props} />
    </Provider>,
  );
  it('should render DropdownCard component without crashing', () => {
    expect(wrapper.find('DropdownCard').length).toEqual(1);
  });
});
