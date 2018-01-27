import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import ravenMiddleware from 'raven-for-redux';
import rootReducer from './reducers';
import rootSaga from './sagas';

const { Raven } = window;

export default function (history) {
  const sagaMiddleware = createSagaMiddleware();
  const router = routerMiddleware(history);
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(
      ravenMiddleware(Raven, {
        getUserContext: state => state.user.email,
      }),
      sagaMiddleware,
      router,
    )),
  );
  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default; // eslint-disable-line
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
