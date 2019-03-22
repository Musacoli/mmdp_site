import React from 'react';
import { mount } from 'enzyme';
import { ThematicPillars } from '../../../containers/DropDowns/ThematicPillars';

describe('< ThematicPillarDropdown/>', () => {
  let wrapper;
  let props;
  const thematicPillar = 'option2';
  beforeEach(() => {
    props = {
      addTempState: jest.fn(),
      addThematicPillar: jest.fn(),
      fetchThematicPillars: jest.fn(),
      deletethematicPillar: jest.fn(),
      loading: false,
      thematicPillars: [
        {
          description: 'asdfasdf',
          pillarTitle: 'option1',
          __v: 0,
          _id: '5c90de765a04a53d87040c5e',
        },
        {
          description: 'asdfasdf',
          pillarTitle: 'option2',
          __v: 0,
          _id: '5c90de765a04a53d87040c5e1',
        },
      ],
    };
    wrapper = mount(<ThematicPillars {...props} />);
  });
  it('should render Thematic pillar component without crashing', () => {
    expect(wrapper.find('ThematicPillars').length).toEqual(1);
  });
  it('should add temp state', () => {
    wrapper.setProps(props);
    wrapper.instance().editADropdown(props.thematicPillars[0]);
    wrapper.instance().deleteADropdown(props.thematicPillars[0]);
    wrapper.setProps(props);
    wrapper.instance().addTempState();
    expect(wrapper.state('dropdowns')[0].pillarTitle).toEqual(thematicPillar);
  });
  it('should handleSubmit', () => {
    wrapper.setProps(props);
    wrapper.instance().editADropdown(props.thematicPillars[0]);
    wrapper.instance().deleteADropdown(props.thematicPillars[0]);
    wrapper.instance().handleSubmit();
    expect(wrapper.state('dropdowns')[0].pillarTitle).toEqual(thematicPillar);
    expect(props.addThematicPillar).toBeCalledTimes(1);
  });
});
