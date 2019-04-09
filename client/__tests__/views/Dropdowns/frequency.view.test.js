/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Frequency from '../../../views/DropDowns/Frequency';

describe('<Frequency /> ', () => {
  it('renders Frequency component without crashing', () => {
    shallow(<Frequency />);
  });
});
