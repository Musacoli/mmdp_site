import React from 'react';
import { mount } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { Provider } from 'react-redux';
import { DocumentList } from '../../../containers/Resources/Document/DocumentList';
import { initialState } from '../../../store/reducers/resources/document';
import { store } from '../../../store';

describe.only('DocumentList', () => {
  let wrapper;
  let props;
  const data = { results: [{ _id: 'someId', title: 'someTitle' }] };
  const documents = { ...initialState, data };
  beforeEach(() => {
    props = {
      getDocuments: jest.fn(),
      loading: false,
      history: { push: jest.fn() },
      documents: documents.data,
    };

    wrapper = mount(
      <Provider store={store}>
        <DocumentList {...props} />
      </Provider>,

      new ReactRouterEnzymeContext(),
    );
  });
  it('should mount without crashing', () => {
    expect(wrapper.find('Document').length).toEqual(1);
  });
});