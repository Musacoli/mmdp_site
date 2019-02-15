import React from 'react';
import { shallow } from 'enzyme';
import PillarOneView from '../../../views/Pillar/pillarOne';
import PillarTwoView from '../../../views/Pillar/pillarTwo';
import PillarThreeView from '../../../views/Pillar/pillarThree';
import PillarFourView from '../../../views/Pillar/pillarFour';

describe('Pillar view', () => {
  it('renders PillarOneView component wihout crashing', () => {
    shallow(<PillarOneView />);
  });
  it('renders PillarTwoView component wihout crashing', () => {
    shallow(<PillarTwoView />);
  });
  it('renders PillarThreeView wothout crashing', () => {
    shallow(<PillarThreeView />);
  });
  it('renders PillarFourView component wihout crashing', () => {
    shallow(<PillarFourView />);
  });
});
