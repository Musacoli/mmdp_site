import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { DeleteDropdowns } from '../../../containers/ManageDropdowns/DeleteDropdowns';
import { store } from '../../../store';

describe('<DeleteDropdowns />', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      DeleteD: jest.fn(),
      loading: false,
      id: 1,
      _id: 2,
    };
    wrapper = mount(
      <Provider store={store}>
        <DeleteDropdowns {...props} />
      </Provider>,
    );
  });
  it('should render DeleteDropdowns component without crashing', () => {
    expect(wrapper.find('DeleteDropdowns').length).toEqual(1);
  });
});
