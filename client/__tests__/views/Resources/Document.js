/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import AddDocument from '../../../views/Resources/Document/AddDocument';
import EditDocument from '../../../views/Resources/Document/EditDocument';
import AddMedia from '../../../views/Resources/Document/AddMedia';

const views = [
  { component: AddDocument, name: 'AddDocument' },
  { component: EditDocument, name: 'EditDocument' },
  { component: AddMedia, name: 'AddMedia' },
];
describe('Resources Views ', () => {
  views.map((item) => {
    return it(`renders ${item.name} component without crashing`, () => {
      shallow(<item.component />);
    });
  });
});
