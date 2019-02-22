import React from 'react';
import { mount } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { MediaList } from '../../../containers/Resources/Media/MediaList';
import { initialState } from '../../../store/reducers/resources/document';

describe.only('MediaList', () => {
  let wrapper;
  let props;
  const data = {
    results: [
      {
        _id: 'id',
        mediaFile: { url: 'http://' },
        mediaType: 'video',
      },
      {
        _id: 'id2',
        mediaFile: { url: 'http://' },
        mediaType: 'document',
      },
    ],
  };
  const documents = { ...initialState, data };
  beforeEach(() => {
    props = {
      getDocuments: jest.fn(),
      loading: false,
      history: { push: jest.fn() },
      documents: documents.data,
      isMedia: true,
    };
    wrapper = mount(<MediaList {...props} />, new ReactRouterEnzymeContext());
  });
  it('should mount without crashing', () => {
    expect(wrapper.find('Document').length).toEqual(1);
  });
});
