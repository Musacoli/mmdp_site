/* eslint-env jest */
import {
  ADD_GROUP_ITEM,
  ADD_ALL_GROUP_ITEM,
  REMOVE_ALL_GROUP_ITEM,
} from '../../../../constants';
import groupCartReducer, {
  initialState,
} from '../../../../store/reducers/group/cart';

const id = 'someId';
describe('groupCartReducer Reducer', () => {
  it('should provide an initial state', () => {
    expect(groupCartReducer(initialState, {})).toEqual(initialState);
  });

  it('should fetch groupReducer', () => {
    expect(
      groupCartReducer([], {
        type: ADD_GROUP_ITEM,
        payload: id,
      }),
    ).toEqual([id]);
  });

  it('should fetch groupReducer', () => {
    expect(
      groupCartReducer([id], {
        type: ADD_GROUP_ITEM,
        payload: id,
      }),
    ).toEqual([]);
  });

  it('should add all groups to the cart', () => {
    expect(
      groupCartReducer([], {
        type: ADD_ALL_GROUP_ITEM,
        payload: id,
      }),
    ).toEqual([id]);
  });

  it('should add all groups to the cart', () => {
    expect(
      groupCartReducer([id], {
        type: ADD_ALL_GROUP_ITEM,
        payload: id,
      }),
    ).toEqual([id]);
  });

  it('should remove all groups to the cart', () => {
    expect(
      groupCartReducer([], {
        type: REMOVE_ALL_GROUP_ITEM,
        payload: id,
      }),
    ).toEqual([]);
  });
});
