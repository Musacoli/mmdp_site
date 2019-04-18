import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import toastr from 'toastr';
import { api } from '../../../../utils/api';
import * as actions from '../../../../store/actions/dropdowns/subTheme';
import {
  fetchSubThemesAsync,
  addSubThemesAsync,
  deleteSubThemesAsync,
} from '../../../../store/sagas/dropdowns/subTheme';

const payload = { data: {}, new: true, id: 'someId' };
describe('Sub theme type saga', () => {
  describe('fetchSubThemesAsync', async () => {
    const it = sagaHelper(fetchSubThemesAsync({ payload }));
    it('should have yield fetch sub themes', (result) => {
      expect(result).toEqual(call(api.dropdowns.subTheme.list));
    });
    it('and then yield dispatch fetchSubThemesSuccess', (result) => {
      expect(result).toEqual(put(actions.fetchSubThemesSuccess(payload.data)));
      return new Error('Some error');
    });

    it('and then yield dispatch fetchSubThemesFailure', (result) => {
      expect(result).toEqual(put(actions.fetchSubThemesFailure({})));
    });
    it('and then yield dispatch call toastr warning', (result) => {
      expect(result).toEqual(call(toastr.warning, 'Error listing sub themes'));
    });
  });

  describe('addSubThemesAsync', async () => {
    let it = sagaHelper(addSubThemesAsync({ payload }));
    it('should have yield add sub themes types', (result) => {
      expect(result).toEqual(call(api.dropdowns.subTheme.create, payload.data));
    });
    it('and then yield dispatch addSubThemesSuccess', (result) => {
      expect(result).toEqual(put(actions.addSubThemesSuccess(undefined)));
    });
    it('and them yield dispatch fetchSubThemes', (result) => {
      expect(result).toEqual(put(actions.fetchSubThemes(undefined)));
    });

    it('and then yield dispatch call toastr success', (result) => {
      expect(result).toEqual(
        call(toastr.success, 'Sub theme added successfully'),
      );
      return new Error('Some error');
    });

    it('and then yield dispatch addSubThemesFailure', (result) => {
      expect(result).toEqual(put(actions.addSubThemesFailure({})));
    });
    it('and then yield call toastr warning', (result) => {
      expect(result).toEqual(call(toastr.warning, 'Error adding sub themes'));
    });

    const data = { ...payload, new: false };

    it = sagaHelper(addSubThemesAsync({ payload: data }));
    it('should have yield call update sub themes', (result) => {
      expect(result).toEqual(call(api.dropdowns.subTheme.update, payload.data));
    });
  });

  describe('deleteSubThemesAsync', async () => {
    const it = sagaHelper(deleteSubThemesAsync({ payload }));
    it('should have yield delete sub theme type', (result) => {
      expect(result).toEqual(call(api.dropdowns.subTheme.delete, payload.id));
    });
    it('and then yield dispatch deleteSubThemeSuccess', (result) => {
      expect(result).toEqual(put(actions.deleteSubThemeSuccess({})));
    });
    it('and then yield dispatch fetchSubThemes', (result) => {
      expect(result).toEqual(put(actions.fetchSubThemes({})));
    });
    it('and then yield dispatch call toastr success', (result) => {
      expect(result).toEqual(
        call(toastr.success, 'Subtheme deleted successfully'),
      );
      return new Error('Some error');
    });

    it('and then yield dispatch deleteSubTheme', (result) => {
      expect(result).toEqual(put(actions.deleteSubThemeFailure({})));
    });
    it('and then yield dispatch call toastr error', (result) => {
      expect(result).toEqual(call(toastr.warning, 'Error deleting sub themes'));
    });
  });
});
