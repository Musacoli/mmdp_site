/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Country from '../../../views/Matrix/Country';

describe('<Country /> ', () => {
  it('renders Country View component without crashing', () => {
    shallow(<Country />);
  });
});
