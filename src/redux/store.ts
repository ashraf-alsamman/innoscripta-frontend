import { configureStore, combineReducers, Reducer, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
 
import persistedAuthSlice from './authSlice';
import articlesReducer from './articlesSlice';
import preferencesReducer from './preferenceSlice';
import {
 
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'


interface RootState {
  counter: number;
  persistedCounter: number;
}

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer: Reducer<RootState> = combineReducers<any>({
    articles: articlesReducer,
    preferences: preferencesReducer,
    auth: persistedAuthSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const persistor = persistStore(store);

export { store, persistor };