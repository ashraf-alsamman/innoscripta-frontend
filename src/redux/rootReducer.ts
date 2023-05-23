import { combineReducers } from 'redux';
import authReducer from './authSlice';
import articlesReducer from './articlesSlice';
import preferencesReducer from './preferenceSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  articles: articlesReducer,
  preferences: preferencesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;