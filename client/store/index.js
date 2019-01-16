import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from '../middlewares/saga';

const logger = createLogger();

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));
store.runSaga = sagaMiddleware.run;
store.close = () => store.dispatch(END);
store.runSaga(rootSaga);

export default store;
