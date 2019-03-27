import React from 'react';
import { mount } from 'enzyme';
import TargetAudienceForm from '../../../components/DropDowns/TargetAudience';

describe('<TargetAudienceForm />', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      addNewDropDown: jest.fn(),
      handleDelete: jest.fn(),
      deleteATargetAudience: jest.fn(),
      loading: false,
      item: {
        description: 'asdfasdf',
        audienceType: 'one',
        __v: 0,
        _id: '5c90de765a04a53d87040c5e',
      },
      dropdowns: [
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
    };
    wrapper = mount(<TargetAudienceForm {...props} />);
  });
  it('should render TargetAudience form component without crashing', () => {
    expect(wrapper.find('TargetAudience').length).toEqual(1);
  });
});
