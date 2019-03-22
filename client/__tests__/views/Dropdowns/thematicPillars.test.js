/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import ThematicPillars from '../../../views/DropDowns/ThematicPillars';

describe('<ThematicPillars /> ', () => {
  it('renders ThematicPillarsView component without crashing', () => {
    shallow(<ThematicPillars />);
  });
});
