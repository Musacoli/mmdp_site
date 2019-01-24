import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '..';

const mockStore = configureMockStore();
const store = mockStore({ state: [] });

describe('<Login /> ', () => {
  it('renders Login conatiner without crashing', () => {
    const state = {
      username: 'chucky',
      password: 'pass12312',
    };
    // const wrapper = shallow(<Login />);
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>,
    );
    wrapper.setState({ ...state });
  });
});
