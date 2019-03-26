import React from 'react';
import { mount } from 'enzyme';
import { Ward } from '../../../containers/DropDowns/Ward';

describe('<Ward />', () => {
  let wrapper;
  let props;
  const wardName = 'nairobi ward';
  beforeEach(() => {
    props = {
      fetchLgas: jest.fn(),
      lgas: [{ text: 'kenya', value: 'someId', _id: 'sdfsdfsdfs' }],
      addWards: jest.fn(),
      fetchWards: jest.fn(),
      deleteWard: jest.fn(),
      loading: false,
      wards: [
        {
          __v: 0,
          wardName,
          lgaId: '5c98cab726abf99ee88b9a13',
          description: 'nairobi description',
          _id: '5c9cbe7070979672295f2b03',
        },
        {
          __v: 0,
          wardName: 'kampala ward',
          lgaId: '5c98cab726abf99ee88b9a14',
          description: 'kampala description',
          id: '5c9cbe7070979672k295f2b05',
        },
      ],

    };
    wrapper = mount(<Ward {...props} />);
  });
  it('should render Ward component without crashing', () => {
    expect(wrapper.find('Ward').length).toEqual(2);
  });
  it('should add temp ward', () => {
    wrapper.instance().addTempState();
    wrapper.instance().editWard(props.wards[0]);
    wrapper.instance().deleteWard(props.wards[0]);
    wrapper.instance().deleteWard(props.wards[1]);
    wrapper.instance().componentDidUpdate();
    wrapper.instance().handleSubmit();
    expect(wrapper.state('dropdowns')[0].wardName).toEqual(wardName);
  });
});
