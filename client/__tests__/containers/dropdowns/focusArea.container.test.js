import React from 'react';
import { mount } from 'enzyme';
import { FocusAreaOption } from '../../../containers/DropDowns/FocusArea';

describe('<FocusAreaOption />', () => {
  let wrapper;
  let props;
  const focusAreaName = 'Roysambu';
  beforeEach(() => {
    props = {
      fetchSubthemes: jest.fn(),
      subTheme: [{ text: 'raw data', value: 'someId', _id: 'sdfsdfsdfs' }],
      addFocusArea: jest.fn(),
      fetchFocusArea: jest.fn(),
      deleteFocusArea: jest.fn(),
      loading: false,
      focusAreas: [
        {
          _id: '5cadb64c5130594af42a1171',
          __v: 0,
          focusAreaName,
          subThemeId: '5cad0d08066bf948f17be153',
          description: 'description',
        },
        {
          _id: '5caf4688479e223a80b5a9ab',
          __v: 0,
          focusAreaName: 'Charity walk',
          description: 'description',
          subThemeId: '5cad0d08066bf948f17be153',
        },
      ],
    };
    wrapper = mount(<FocusAreaOption {...props} />);
  });
  it('should render FocusAreaOption component without crashing', () => {
    expect(wrapper.find('FocusAreaOption').length).toEqual(1);
  });
  it('should add temp focus area', () => {
    wrapper.instance().addTempFocusArea();
    wrapper.instance().editFocusArea(props.focusAreas[0]);
    wrapper.instance().deleteAFocusArea(props.focusAreas[0]);
    wrapper.instance().deleteAFocusArea(props.focusAreas[1]);
    wrapper.instance().componentDidUpdate();
    wrapper.instance().handleSubmit();
    expect(wrapper.state('dropdowns')[0].focusAreaName).toEqual(focusAreaName);
  });
});
