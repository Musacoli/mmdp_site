import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import { api } from '../../../../utils/api';
import { FETCHING_TARGET_AUDIENCES } from '../../../../constants/dropdowns/targetAudience';
import {
  loadTargetAudiences,
  createTargetAudiences,
  deleteTargetAudience,
  updateTargetAudiences,
} from '../../../../store/sagas/dropdowns/targetAudience';
import {
  fetchTargetAudiences,
  targetAudiencesCreatedSuccessfully,
} from '../../../../store/actions';

const id = 1;
const payload = { id };
const updatePayload = {
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
};

describe('Target Audiences saga', async () => {
  describe('loadTargetAudiences', async () => {
    const it = sagaHelper(loadTargetAudiences());
    it('should have called api list Target Audience', (result) => {
      expect(result).toEqual(call(api.dropdowns.targetAudience.list));
    });
    it('and then trigger a load Target Audiences', (result) => {
      expect(result).toEqual(put(fetchTargetAudiences(undefined)));
    });
  });
  describe('createTargetAudience', async () => {
    const it = sagaHelper(createTargetAudiences({ payload: null }));
    it('should have called the create Target Audience', (result) => {
      expect(result).toEqual(call(api.dropdowns.targetAudience.create, null));
    });
    it('and then trigger a Target Audience created successfully', (result) => {
      expect(result).toEqual(
        put(targetAudiencesCreatedSuccessfully(undefined)),
      );
    });
  });
  describe('updateTargetAudiences', async () => {
    const it = sagaHelper(updateTargetAudiences({ updatePayload }));
    it('should have called api put Target Audience', (result) => {
      expect(result).toEqual(
        call(api.dropdowns.targetAudience.update, undefined),
      );
    });
    it(' and then trigger Target Audience created successfully', (result) => {
      expect(result).toEqual(
        put(targetAudiencesCreatedSuccessfully(undefined)),
      );
    });
  });
  describe('deleteTargetAudience', async () => {
    const it = sagaHelper(deleteTargetAudience({ payload }));
    it('should have called the delete Target Audience', (result) => {
      expect(result).toEqual(call(api.dropdowns.targetAudience.delete, 1));
    });
    it('and then trigger a FETCHING_STAFF_STRENGTH action', (result) => {
      expect(result).toEqual(
        put({
          type: FETCHING_TARGET_AUDIENCES,
        }),
      );
    });
  });
});
