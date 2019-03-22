import React from 'react';
import { mount } from 'enzyme';
import { SubTheme } from '../../../containers/DropDowns/SubTheme';

describe('<SubTheme />', () => {
  let wrapper;
  let props;
  const subThemeName = 'Charity walk';
  beforeEach(() => {
    props = {
      fetchThematicPillars: jest.fn(),
      thematicPillars: [
        { text: 'Helping returnees', value: 'someId', _id: 'sdfsdfsdfs' },
      ],
      addSubThemes: jest.fn(),
      fetchSubThemes: jest.fn(),
      deleteSubTheme: jest.fn(),
      loading: false,
      subTheme: [
        {
          _id: '5cadb64c5130594af42a1171',
          __v: 0,
          subThemeName,
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
    };
    wrapper = mount(<SubTheme {...props} />);
  });
  it('should render SubTheme component without crashing', () => {
    expect(wrapper.find('SubTheme').length).toEqual(2);
  });
  it('should add temp subTheme', () => {
    wrapper.instance().addTempState();
    wrapper.instance().editSubTheme(props.subTheme[0]);
    wrapper.instance().deleteSubTheme(props.subTheme[0]);
    wrapper.instance().deleteSubTheme(props.subTheme[1]);
    wrapper.instance().componentDidUpdate();
    wrapper.instance().handleSubmit();
    expect(wrapper.state('dropdowns')[0].subThemeName).toEqual(subThemeName);
  });
});
