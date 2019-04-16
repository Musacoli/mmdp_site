import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import DeleteDropdown from '../../../components/ManageDropdowns/DeleteDropdown';
import { store } from '../../../store';

describe('<DeleteDropdown />', () => {
  const props = {
    deleteD: jest.fn(),
    closeModal: jest.fn(),
    open: false,
    handleDelete: jest.fn(),
  };
  const wrapper = mount(
    <Provider store={store}>
      <DeleteDropdown {...props} />
    </Provider>,
  );
  it('should render DeleteDropdown component without crashing', () => {
    expect(wrapper.find('DeleteDropdown').length).toEqual(1);
  });
});
