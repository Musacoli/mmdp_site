import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import toastr from 'toastr';
import { LGAMap, getLGAs } from '../../../../utils/matrix/lga';
import * as actions from '../../../../store/actions/matrix/lga';
import {
  getStateMaps,
  addStateMatrix,
} from '../../../../store/sagas/matrix/lga';

const payload = { data: [] };

describe('StateMap saga tests', () => {
  describe('fetchStateMap', async () => {
    const it = sagaHelper(getStateMaps({ payload: { page: 1 } }));
    it('should have yield fetch State maps', (result) => {
      expect(result).toEqual(call(getLGAs, { page: 1 }));
    });
    describe('addStateMatrix', async () => {
      const it = sagaHelper(addStateMatrix({ payload }));
      it('should have yield fetch LGA maps', (result) => {
        expect(result).toEqual(call(LGAMap.update, payload));
      });
    });
  });
});
