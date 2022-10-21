import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import authLoginReducer from 'src/auth/login/auth.slice';
import loginReducer from 'src/auth/login/login.slice';
import adminReducer from 'src/admin/admin.slice';
import storeAdminReducer from 'src/store-admin/storeAdmin.slice';
// slices

// ----------------------------------------------------------------------
const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['authLogin', 'login'],
};

const rootReducer = combineReducers({ 
  authLogin: authLoginReducer,
  login: loginReducer,
  storeAdmin: storeAdminReducer,
  admin:adminReducer 
});

export { rootPersistConfig, rootReducer };
