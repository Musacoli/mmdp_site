import { call, put } from 'redux-saga/effects';
import toastr from 'toastr';

toastr.options = {
  preventDuplicates: true,
};

const handleResponseMessage = (response, customMessage, isError = false) => {
  if (isError) {
    const message = response.response.data.message || customMessage;
    toastr.warning(message);
  } else {
    const message = response.data.message || customMessage;
    toastr.success(message);
  }
};

export const addAsyncCreator = (addAsyncPayload) =>
  function* addAsyncGen({ payload }) {
    try {
      const { data, create } = payload;
      const response = create
        ? yield call(addAsyncPayload.createFunc, data)
        : yield call(addAsyncPayload.updateFunc, data);
      yield put(addAsyncPayload.handleSuccessAction());
      yield put(addAsyncPayload.handleFetchAction());
      handleResponseMessage(response, addAsyncPayload.customSuccessMessage);
    } catch (error) {
      yield put(addAsyncPayload.handleFailureAction({}));
      handleResponseMessage(error, addAsyncPayload.customSuccessMessage, true);
    }
  };

export const fetchAsyncCreator = (fetchAsyncPayload) =>
  function* fetchAsyncGen() {
    try {
      const response = yield call(fetchAsyncPayload.fetchFunc);
      const data = response && response.data ? response.data.data : {};
      yield put(fetchAsyncPayload.handleSuccessAction(data));
    } catch (error) {
      yield put(fetchAsyncPayload.handleFailureAction({}));
      handleResponseMessage(error, fetchAsyncPayload.customErrMessage, true);
    }
  };

export const deleteAsyncCreator = (deletAsyncPayload) =>
  function* fetchAsyncGen({ payload }) {
    try {
      const response = yield call(deletAsyncPayload.deleteFunc, payload.id);
      const data = response ? response.data : {};
      yield put(deletAsyncPayload.handleSuccessAction(data));
      yield put(deletAsyncPayload.handleFetchAction(data));
      handleResponseMessage(response, deletAsyncPayload.customSuccessMessage);
    } catch (error) {
      yield put(deletAsyncPayload.handleFailureAction({}));
      handleResponseMessage(error, deletAsyncPayload.customErrMessage, true);
    }
  };
