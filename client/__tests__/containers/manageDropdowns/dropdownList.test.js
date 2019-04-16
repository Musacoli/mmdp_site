import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Dropdowns } from '../../../containers/ManageDropdowns/DropdownsList';
import { store } from '../../../store';

describe('<Dropdowns />', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      fetchDropdowns: jest.fn(),
      loading: false,
      dropdowns: [
        {
          model: 'OrganisationType',
          id: 17,
          title: 'Organization Type',
          route: 'organization-type',
          name: 'organizationtype',
        },
      ],
    };
    wrapper = mount(
      <Provider store={store}>
        <Dropdowns {...props} />
      </Provider>,
    );
  });
  it('should render Dropdowns component without crashing', () => {
    expect(wrapper.find('Dropdowns').length).toEqual(1);
  });
});
