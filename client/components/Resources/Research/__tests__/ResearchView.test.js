import React from 'react';
import { shallow } from 'enzyme';
import ResearchView from '../ResearchView';

describe('<ResearchView /> ', () => {
  it('renders ResearchView component without crashing', () => {
    const props = {
      onChange: jest.fn(),
    };
    shallow(<ResearchView {...props} />);
  });
});
