import React from 'react';
import { shallow } from 'enzyme';
import {
  Objectives,
  EdoStateApproach,
  AboutMMDP,
  Coordination,
  GovernorMessage,
} from '../../../views/About';

describe('<Templates /> ', () => {
  it('renders Objectives component without crashing', () => {
    shallow(<Objectives />);
  });
  it('renders EdoStateApproach component without crashing', () => {
    shallow(<EdoStateApproach />);
  });
  it('renders AboutMMDP component without crashing', () => {
    shallow(<AboutMMDP />);
  });
  it('renders Coordination component without crashing', () => {
    shallow(<Coordination />);
  });
  it('renders GovernorMessage component without crashing', () => {
    shallow(<GovernorMessage />);
  });
});
