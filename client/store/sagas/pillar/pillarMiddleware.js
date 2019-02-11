import { call, put, takeLatest } from 'redux-saga/effects';
import toastr from '../../../utils/toastr';
import * as pillarApi from '../../../utils/pillar/pillar';
import * as types from '../../../constants/pillar/pillar';

// Pillar one watchers
export function* createPillarOne(action) {
  yield put({ type: types.PILLAR_MESSAGE_LOADING_ONE });
  toastr.remove();
  try {
    const { data } = yield call(pillarApi.createPillar, action.payload);
    yield put({ type: types.PILLAR_MESSAGE_SUCCESS_ONE, payload: data.pillar });
    toastr.success('Pillar created succesfully');
  } catch (error) {
    yield put({
      type: types.PILLAR_MESSAGE_FAILURE_ONE,
      error: error.response.data.errors,
    });
    toastr.error(error.response.data.errors.join('\\n'));
  }
}

export function* updatePillarOne(action) {
  yield put({ type: types.PILLAR_MESSAGE_LOADING_ONE });
  toastr.remove();
  try {
    const { data } = yield call(pillarApi.updatePillar, action.payload);
    yield put({ type: types.PILLAR_MESSAGE_SUCCESS_ONE, payload: data.pillar });
    toastr.success('Pillar updated succesfully');
  } catch (error) {
    yield put({
      type: types.PILLAR_MESSAGE_FAILURE_ONE,
      error: error.response.data.errors,
    });
    toastr.error(error.response.data.errors.join('\\n'));
  }
}

export function* getPillarOne(action) {
  yield put({ type: types.PILLAR_MESSAGE_LOADING_ONE });
  try {
    const { data } = yield call(pillarApi.getPillar, action);

    yield put({
      type: types.PILLAR_MESSAGE_SUCCESS_ONE,
      payload: data.pillar[0],
    });
  } catch (error) {
    yield put({
      type: types.PILLAR_MESSAGE_FAILURE_ONE,
      error: error.response.data.errors,
    });
  }
}

// Pillar two watchers

export function* createPillarTwo(action) {
  yield put({ type: types.PILLAR_MESSAGE_LOADING_TWO });
  toastr.remove();
  try {
    const { data } = yield call(pillarApi.createPillar, action.payload);
    yield put({ type: types.PILLAR_MESSAGE_SUCCESS_TWO, payload: data.pillar });
    toastr.success('Pillar created succesfully');
  } catch (error) {
    yield put({
      type: types.PILLAR_MESSAGE_FAILURE_TWO,
      error: error.response.data.errors,
    });
    toastr.error(error.response.data.errors.join('\\n'));
  }
}

export function* updatePillarTwo(action) {
  yield put({ type: types.PILLAR_MESSAGE_LOADING_TWO });
  toastr.remove();
  try {
    const { data } = yield call(pillarApi.updatePillar, action.payload);
    yield put({ type: types.PILLAR_MESSAGE_SUCCESS_TWO, payload: data.pillar });
    toastr.success('Pillar updated succesfully');
  } catch (error) {
    yield put({
      type: types.PILLAR_MESSAGE_FAILURE_TWO,
      error: error.response.data.errors,
    });
    toastr.error(error.response.data.errors.join('\\n'));
  }
}

export function* getPillarTwo(action) {
  yield put({ type: types.PILLAR_MESSAGE_LOADING_TWO });
  try {
    const { data } = yield call(pillarApi.getPillar, action);

    yield put({
      type: types.PILLAR_MESSAGE_SUCCESS_TWO,
      payload: data.pillar[0],
    });
  } catch (error) {
    yield put({
      type: types.PILLAR_MESSAGE_FAILURE_TWO,
      error: error.response.data.errors,
    });
  }
}
// Pillar three watchers

export function* createPillarThree(action) {
  yield put({ type: types.PILLAR_MESSAGE_LOADING_THREE });
  toastr.remove();
  try {
    const { data } = yield call(pillarApi.createPillar, action.payload);
    yield put({
      type: types.PILLAR_MESSAGE_SUCCESS_THREE,
      payload: data.pillar,
    });
    toastr.success('Pillar created succesfully');
  } catch (error) {
    yield put({
      type: types.PILLAR_MESSAGE_FAILURE_THREE,
      error: error.response.data.errors,
    });
    toastr.error(error.response.data.errors.join('\\n'));
  }
}

export function* updatePillarThree(action) {
  yield put({ type: types.PILLAR_MESSAGE_LOADING_THREE });
  toastr.remove();
  try {
    const { data } = yield call(pillarApi.updatePillar, action.payload);
    yield put({
      type: types.PILLAR_MESSAGE_SUCCESS_THREE,
      payload: data.pillar,
    });
    toastr.success('Pillar updated succesfully');
  } catch (error) {
    yield put({
      type: types.PILLAR_MESSAGE_FAILURE_THREE,
      error: error.response.data.errors,
    });
    toastr.error(error.response.data.errors.join('\\n'));
  }
}

export function* getPillarThree(action) {
  yield put({ type: types.PILLAR_MESSAGE_LOADING_THREE });
  try {
    const { data } = yield call(pillarApi.getPillar, action);

    yield put({
      type: types.PILLAR_MESSAGE_SUCCESS_THREE,
      payload: data.pillar[0],
    });
  } catch (error) {
    yield put({
      type: types.PILLAR_MESSAGE_FAILURE_THREE,
      error: error.response.data.errors,
    });
  }
}

// Pillar four watchers

export function* createPillarFour(action) {
  yield put({ type: types.PILLAR_MESSAGE_LOADING_FOUR });
  toastr.remove();
  try {
    const { data } = yield call(pillarApi.createPillar, action.payload);
    yield put({
      type: types.PILLAR_MESSAGE_SUCCESS_FOUR,
      payload: data.pillar,
    });
    toastr.success('Pillar created succesfully');
  } catch (error) {
    yield put({
      type: types.PILLAR_MESSAGE_FAILURE_FOUR,
      error: error.response.data.errors,
    });
    toastr.error(error.response.data.errors.join('\\n'));
  }
}

export function* updatePillarFour(action) {
  yield put({ type: types.PILLAR_MESSAGE_LOADING_FOUR });
  toastr.remove();
  try {
    const { data } = yield call(pillarApi.updatePillar, action.payload);
    yield put({
      type: types.PILLAR_MESSAGE_SUCCESS_FOUR,
      payload: data.pillar,
    });
    toastr.success('Pillar updated succesfully');
  } catch (error) {
    yield put({
      type: types.PILLAR_MESSAGE_FAILURE_FOUR,
      error: error.response.data.errors,
    });
    // toastr.error(error.response.data.errors.join('\\n'));
  }
}

export function* getPillarFour(action) {
  yield put({ type: types.PILLAR_MESSAGE_LOADING_FOUR });
  try {
    const { data } = yield call(pillarApi.getPillar, action);

    yield put({
      type: types.PILLAR_MESSAGE_SUCCESS_FOUR,
      payload: data.pillar[0],
    });
  } catch (error) {
    yield put({
      type: types.PILLAR_MESSAGE_FAILURE_FOUR,
      error: error.response.data.errors,
    });
  }
}

// Pillar one watchers
export function* createPillarWatcher1() {
  yield takeLatest(types.CREATE_PILLAR_ONE, createPillarOne);
}

export function* updatePillarWatcher1() {
  yield takeLatest(types.UPDATE_PILLAR_ONE, updatePillarOne);
}

export function* getPillarWatcher1() {
  yield takeLatest(types.GET_PILLAR_ONE, getPillarOne);
}

// Pillar two watchers
export function* createPillarWatcher2() {
  yield takeLatest(types.CREATE_PILLAR_TWO, createPillarTwo);
}

export function* updatePillarWatcher2() {
  yield takeLatest(types.UPDATE_PILLAR_TWO, updatePillarTwo);
}

export function* getPillarWatcher2() {
  yield takeLatest(types.GET_PILLAR_TWO, getPillarTwo);
}

// Pillar three watchers

export function* createPillarWatcher3() {
  yield takeLatest(types.CREATE_PILLAR_THREE, createPillarThree);
}

export function* updatePillarWatcher3() {
  yield takeLatest(types.UPDATE_PILLAR_THREE, updatePillarThree);
}

export function* getPillarWatcher3() {
  yield takeLatest(types.GET_PILLAR_THREE, getPillarThree);
}

// Pillar four watchers

export function* createPillarWatcher4() {
  yield takeLatest(types.CREATE_PILLAR_FOUR, createPillarFour);
}

export function* updatePillarWatcher4() {
  yield takeLatest(types.UPDATE_PILLAR_FOUR, updatePillarFour);
}

export function* getPillarWatcher4() {
  yield takeLatest(types.GET_PILLAR_FOUR, getPillarFour);
}
