import React from 'react';
import { mount } from 'enzyme';
import {
  Community,
  mapDispatchToProps,
} from '../../../containers/DropDowns/Community';

let wrapper;
let instance;
let stateProps;
let dispatch;
let dispatchProps;
const item = {
  _id: '7775732',
  communityName: 'name',
  index: 1,
  description: 'heh',
};

describe('test community container', () => {
  stateProps = {
    getStates: jest.fn(),
    fetchCommunities: jest.fn(),
    addCommunity: jest.fn(),
    removeCommunity: jest.fn(),
    fetchWards: jest.fn(),
    communities: [
      { _id: '7775732', name: 'name', index: 1 },
      { name: 'nameew', index: 2 },
    ],
  };
  beforeEach(() => {
    wrapper = mount(<Community {...stateProps} />);
    instance = wrapper.instance();
    dispatch = jest.fn(() => Promise.resolve());
    dispatchProps = mapDispatchToProps(dispatch);
  });
  it('should  render community container', () => {
    expect(wrapper.length).toBe(1);
  });
  it('should dispatch addCommunity', () => {
    dispatchProps.addCommunity({});
    expect(dispatch).toHaveBeenCalledWith({
      payload: {},
      type: 'ADD_COMMUNITIES',
    });
  });

  it('should check for the following component functions', () => {
    instance.editCommunity(item);
    instance.addTempCommunity();
    instance.getDuplicate(item);
    instance.getWards();
    instance.setState({
      dropdowns: [
        {
          communityName: 'Hayos',
          description: 'people',
          wardId: '5ca47b149f2d13e26438bf21',
          _id: '5ca48270deedaee04a7e2a6e',
        },
        {
          communityName: 'Malema',
          description: 'people from here',
          wardId: '5ca47b149f2d13e26438bf21',
          id: '5ca48270deedaee04a7e2a6e',
        },
      ],
    });
    instance.handleSubmit();
    instance.dataIsValid([]);
  });
  it('should return false with empty data', () => {
    const form = [
      {
        communityName: '',
        description: 'people from here',
        wardId: '',
        id: '5ca48270deedaee04a7e2a6e',
      },
    ];
    expect(instance.dataIsValid(form)).toBe(false);
  });
});
