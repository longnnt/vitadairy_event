import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import authLoginReducer from 'src/auth/login/auth.slice';
import loginReducer from 'src/auth/login/login.slice';
import storeAdminReducer from 'src/store-admin/storeAdmin.slice';
import eventReducer from 'src/event/event-history-prize/event.slice';
// slices

// ----------------------------------------------------------------------
const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['authLogin'],
};

const rootReducer = combineReducers({ 
  authLogin: authLoginReducer,
  login: loginReducer,
  storeAdmin: storeAdminReducer,
  historyList: eventReducer,
});

export { rootPersistConfig, rootReducer };
