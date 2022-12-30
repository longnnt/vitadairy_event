import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import authLoginReducer from 'src/auth/login/auth.slice';
import loginReducer from 'src/auth/login/login.slice';
import invitationReducer from 'src/shop-invitation/invitationSlice';
import adminReducer from 'src/admin/admin.slice';
import storeAdminReducer from 'src/store-admin/storeAdmin.slice';
import eventPromotionIVReducer from 'src/event-promotion-IV/eventPromotionIV.slice';
import eventReducer from 'src/event/event-history-prize/event.slice';
import listPrizeReducer from 'src/event/list-prize/eventListPrize.slice';
import editEventPrizeSlice from 'src/event/edit-event-prize/editEventPrize.Slice';
import manageEventReducer from 'src/manage-event-quarter-one/manageEvent.slice';

import eventPrizeQ1Reducer from 'src/event-prize-q1/eventPrizeQ1.slice';
// slices

// ----------------------------------------------------------------------
const rootPersistConfig = {
  key: 'vitadairy',
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
  listPrize: listPrizeReducer,
  edit_event_prize: editEventPrizeSlice,

  admin: adminReducer,
  eventPromotionIV: eventPromotionIVReducer,
  manageEvent: manageEventReducer,
  eventPrizeQ1: eventPrizeQ1Reducer
});

export { rootPersistConfig, rootReducer };
