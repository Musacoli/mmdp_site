import React from 'react';
import { mount } from 'enzyme';
import Ward from '../../../components/DropDowns/Ward';

describe('<Ward />', () => {
  const props = {
    fetchWards: jest.fn(),
    dropdowns: [
      {
        __v: 0,
        wardName: 'nairobi ward',
        lgaId: '5c98cab726abf99ee88b9a13',
        description: 'nairobi description',
        _id: '5c9cbe7070979672295f2b03',
      },
      {
        __v: 0,
        wardName: 'kampala ward',
        lgaId: '5c98cab726abf99ee88b9a14',
        description: 'kampala description',
        _id: '5c9cbe7070979672295f2b04',
      },
    ],
    handleSubmit: jest.fn(),
    addTempState: jest.fn(),
    loading: false,
    lgas: [],
  };
  const wrapper = mount(<Ward {...props} />);
  it('should render Ward component without crashing', () => {
    expect(wrapper.find('Ward').length).toEqual(1);
  });
});
