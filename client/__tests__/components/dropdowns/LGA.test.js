import React from 'react';
import { mount } from 'enzyme';
import LGAComponent from '../../../components/DropDowns/LGA';

describe('<LGAComponent />', () => {
  const props = {
    getStates: jest.fn(),
    dropdowns: [
      {
        stateId: '5c878ecd6d5a6b1184b93519',
        description: 'asdfasdf',
        lgaName: 'Abia',
        __v: 0,
        _id: '5c90de765a04a53d87040c5e',
      },
      {
        stateId: '5c878ecd6d5a6b1184b93519',
        description: 'asdfasdf',
        lgaName: 'sfasdfasdfsdf',
        __v: 0,
        id: '5c90de765a04a53d87040c5e',
      },
    ],
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    addNewDropDown: jest.fn(),
    handleDelete: jest.fn(),
    loading: false,
    states: [],
  };
  const wrapper = mount(<LGAComponent {...props} />);
  it('should render LGA component without crashing', () => {
    expect(wrapper.find('LGAComponent').length).toEqual(1);
  });
});
