import React from 'react';
import { mount } from 'enzyme';
import { TargetAudienceDropdown } from '../../../containers/DropDowns/TargetAudience';

describe('< TargetAudienceDropdown/>', () => {
  let wrapper;
  let props;
  const audienceType = 'two';
  beforeEach(() => {
    props = {
      addTargetAudiences: jest.fn(),
      fetchTargetAudiences: jest.fn(),
      deleteTargetAudience: jest.fn(),
      updateTargetAudiences: jest.fn(),
      loading: false,
      TargetAudiences: {
        TargetAudiences: [
          {
            __v: 0,
            audienceType: 'one',
            description: 'testing',
            _id: '5c9be4dc1b82170f454f6f6a',
          },
          {
            __v: 0,
            audienceType: 'two',
            description: 'testing2',
            _id: '5c9be4dc1b82170f454f6f6b',
          },
        ],
      },
    };
    wrapper = mount(<TargetAudienceDropdown {...props} />);
  });
  it('should render Target Audience component without crashing', () => {
    expect(wrapper.find('TargetAudienceDropdown').length).toEqual(1);
  });
  it('should add temp state', () => {
    wrapper.instance().addNewDropdown();
    wrapper.instance().handleChange(props.TargetAudiences.TargetAudiences[0]);
    wrapper
      .instance()
      .deleteATargetAudience(props.TargetAudiences.TargetAudiences[0]);
    wrapper
      .instance()
      .deleteATargetAudience(props.TargetAudiences.TargetAudiences[1]);
    wrapper.instance().handleSubmit();
    expect(wrapper.state('dropdowns')[0].audienceType).toEqual(audienceType);
  });
});
