import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import toastr from 'toastr';

import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/dropdowns/communities';
import {
  fetchCommunities,
  addCommunity,
  deleteCommunity,
} from '../../../../store/sagas/dropdowns/communities';

const payload = { data: {}, new: true, id: '843884381' };
describe('Community saga tests', () => {
  describe('fetchCommunity', async () => {
    const it = sagaHelper(fetchCommunities());
    it('should have yield fetch communities', (result) => {
      expect(result).toEqual(call(api.dropdowns.community.list));
    });
    it('and then yield dispatch fetchCommunitiesSuccess', (result) => {
      expect(result).toEqual(
        put(actions.fetchCommunitiesSuccess(payload.data)),
      );
      return new Error('Some error');
    });
    it('and then yield dispatch fetchCommunitiesFailure', (result) => {
      expect(result).toEqual(put(actions.fetchCommunitiesFailure({})));
    });
    it('and then toast a message', (result) => {
      expect(result).toEqual(call(toastr.warning, 'Error listing communities'));
    });

    describe('addCommunities', async () => {
      const it = sagaHelper(addCommunity({ payload }));
      it('should have yield fetch communities', (result) => {
        expect(result).toEqual(call(api.dropdowns.community.create, payload));
      });
      it('and then yield dispatch addCommunitiesSuccess', (result) => {
        expect(result).toEqual(put(actions.addCommunitiesSuccess(undefined)));
      });
      it('and then yield dispatch fetchCommunities', (result) => {
        expect(result).toEqual(put(actions.fetchCommunities(undefined)));
        return new Error('an error occurred');
      });

      it('and then yield dispatch addStatesFailure', (result) => {
        expect(result).toEqual(put(actions.addCommunitiesFailure({})));
      });
      it('and then toast a message', (result) => {
        expect(result).toEqual(
          call(toastr.warning, 'Error saving communities'),
        );
      });
    });
  });
  describe('deleteCommunity', async () => {
    const it = sagaHelper(deleteCommunity({ payload }));
    it('should have yield delete community', (result) => {
      expect(result).toEqual(call(api.dropdowns.community.delete, payload.id));
    });
    it('and then yield dispatch deleteCommunitySuccess', (result) => {
      expect(result).toEqual(put(actions.deleteCommunitySuccess({})));
    });
    it('and then yield dispatch fetchCommunities', (result) => {
      expect(result).toEqual(put(actions.fetchCommunities(undefined)));
      return new Error('an error occurred');
    });

    it('and then yield dispatch deleteCommunityFailure', (result) => {
      expect(result).toEqual(put(actions.deleteCommunityFailure({})));
    });
    it('and then toast a message', (result) => {
      expect(result).toEqual(call(toastr.warning, 'Error deleting community'));
    });
  });
});
