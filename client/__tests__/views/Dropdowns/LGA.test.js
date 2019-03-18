/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import LGAview from '../../../views/DropDowns/LGA';

describe('<LGAview /> ', () => {
  it('renders LGAview component without crashing', () => {
    shallow(<LGAview />);
  });
});
