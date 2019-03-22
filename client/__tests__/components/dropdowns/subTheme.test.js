import React from 'react';
import { mount } from 'enzyme';
import SubTheme from '../../../components/DropDowns/SubTheme';

describe('<SubTheme />', () => {
  const props = {
    fetchSubThemes: jest.fn(),
    dropdowns: [
      {
        _id: '5cadb64c5130594af42a1171',
        __v: 0,
        subThemeName: 'Eradicate poverty',
        thematicPillarId: '5cad0d08066bf948f17be153',
        description: 'description',
        edoTarget: 'edo state',
      },
      {
        _id: '5caf4688479e223a80b5a9ab',
        __v: 0,
        subThemeName: 'Charity walk',
        description: 'walk the talk',
        thematicPillarId: '5cad0d08066bf948f17be153',
        edoTarget: 'edo state',
      },
    ],
    handleSubmit: jest.fn(),
    addTempState: jest.fn(),
    loading: false,
    thematicOptions: [],
    thematicPillars: [],
  };
  const wrapper = mount(<SubTheme {...props} />);
  it('should render Ward component without crashing', () => {
    expect(wrapper.find('SubTheme').length).toEqual(1);
  });
});
