import React from 'react';
import { mount } from 'enzyme';
import { LGA } from '../../../containers/DropDowns/LGA';

describe('<LGA />', () => {
  const props = {
    getStates: jest.fn(),
    LGAItems: [
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
    getLGAs: jest.fn(),
    updateLGAs: jest.fn(),
    addLGAs: jest.fn(),
    deleteLGAs: jest.fn(),
    loading: false,
    states: [],
  };
  const wrapper = mount(<LGA {...props} />);
  it('should render LGA component without crashing', () => {
    expect(wrapper.find('LGA').length).toEqual(1);
  });
  it('should check for the Following LGA Functions', () => {
    wrapper.instance().handleSubmit();
    wrapper.instance().handleChange(props.LGAItems[0]);
    wrapper.instance().handleDelete(props.LGAItems[0]);
    wrapper.instance().addNewDropDown();
  });
});
