/* eslint-env jest */
import { ADD_GROUP_ITEM, ADD_ALL_GROUP_ITEM, REMOVE_ALL_GROUP_ITEM } from '../../../../constants';
import { addGroupItem, addAllGroupsToCart, removeAllGroupsToCart } from '../cart';

describe('Group Cart Actions Creators', () => {
  it('should dispatch REMOVE_ALL_GROUP_ITEM', () => {
    expect(removeAllGroupsToCart({}).type).toEqual(REMOVE_ALL_GROUP_ITEM);
  });
  it('should dispatch ADD_GROUP_ITEM', () => {
    expect(addGroupItem({}).type).toEqual(ADD_GROUP_ITEM);
  });
  it('should dispatch ADD_ALL_GROUP_ITEM', () => {
    expect(addAllGroupsToCart({}).type).toEqual(ADD_ALL_GROUP_ITEM);
  });
});
