/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Country from '../../../views/DropDowns/Country';

describe('<Country /> ', () => {
  it('renders Country component without crashing', () => {
    shallow(<Country />);
  });
});
