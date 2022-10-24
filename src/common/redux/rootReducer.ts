import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import authLoginReducer from 'src/auth/login/auth.slice';
import loginReducer from 'src/auth/login/login.slice';
import invitationReducer from 'src/shop-invitation/invitationSlice';
import adminReducer from 'src/admin/admin.slice';
import storeAdminReducer from 'src/store-admin/storeAdmin.slice';
import eventReducer from 'src/event/event-history-prize/event.slice';
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
  shop_invitation: invitationReducer,
  storeAdmin: storeAdminReducer,

  historyList: eventReducer,

  admin: adminReducer,

});

export { rootPersistConfig, rootReducer };
