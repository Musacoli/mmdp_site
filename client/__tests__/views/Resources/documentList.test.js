/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import DocumentList from '../../../views/Resources/Document/DocumentList';
import MediaList from '../../../views/Resources/Media/MediaList';

const viewsList = [
  { component: DocumentList, name: 'DocumentList' },
  { component: MediaList, name: 'MediaList' },
];
describe('<MediaList /> ', () => {
  viewsList.map((item) => {
    return it(`renders ${item.name} component without crashing`, () => {
      shallow(<item.component />);
    });
  });
});
