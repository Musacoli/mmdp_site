import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Store from '../../store';

export const mountWithProvider = (component, store = Store) =>
  mount(<Provider store={store}>{component}</Provider>);

describe('Common utils', () => {
  it('should return a provider', () => {
    expect(mountWithProvider(<div />).find('Provider').length).toEqual(1);
  });
});
