import { mount } from 'enzyme/build';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import ExportStakeHoldersCsv from '../../../../containers/Resources/StakeHolders/ExportStakeHoldersCSV';
import { returnStakeholders } from './StakeholdersList.test';

describe('Export Stakeholders to CSV', () => {
  let wrapper;
  const props = {
    data: [returnStakeholders()],
  };
  let store;
  const initialState = {};
  const mockStore = configureStore();

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <ExportStakeHoldersCsv {...props} />
      </Provider>,
    );
  });

  it('should load the ExportStakeholders button correctly', () => {
    expect(wrapper.find('Button').length).toEqual(1);
  });

  it('should update the state on click', () => {
    wrapper.find('Button').simulate('click');
    expect(
      wrapper.find('ExportStakeHoldersCsv').state().stakeholderData.length,
    ).toEqual(props.data.length);
  });
});
