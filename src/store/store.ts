// import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { compose, createStore, applyMiddleware, Middleware } from 'redux';
// // import thunk from 'redux-thunk';
// import createSagaMiddleware from '@redux-saga/core';

// import { rootSaga } from './root-saga';

// import logger from 'redux-logger';
// // import { loggerMiddleware } from '../middleware/logger'; CUSTOMIZED_VERSION_MIDDLEWARE
// import { rootReducer } from './root-reducer';

// export type RootState = ReturnType<typeof rootReducer>;

// declare global {
//   interface window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// };

// type ExtendedPersistConfig = PersistConfig<RootState> & {
//   whitelist: (keyof RootState)[]
// }

// const persistConfig: ExtendedPersistConfig = {
//   key: 'root',
//   storage: storage,
//   whitelist: ['cart']
// };

// const sagaMiddleware = createSagaMiddleware();
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middleWares = [
//   process.env.NODE_ENV !== 'production' && logger,
//   // thunk,
//   sagaMiddleware,
// ].filter((middleware): middleware is Middleware => Boolean(middleware));



// const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// export const store = createStore(persistedReducer, undefined, composedEnhancers);

// sagaMiddleware.run(rootSaga);

// export const persistor = persistStore(store);



import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);