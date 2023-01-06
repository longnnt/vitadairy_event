import { Lang, LangObj } from './common.interfaces';

export const LANG: Record<Lang, Lang> = {
  en: 'en',
  vi: 'vi',
};

export const langs: Record<Lang, LangObj> = {
  en: {
    label: 'English',
    value: 'en',
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  vi: {
    label: 'Vietnamese',
    value: 'vi',
    icon: '/assets/icons/flags/ic_flag_vn.svg',
  },
};
export const DATE_FORMAT = 'dd.MM.yyyy';

export enum BooleanEnum {
  TRUE = 1,
  FALSE = -1,
}

export const FIELD = {
  WOOD: 'wood',
};

export const BREADCUMBS = {
  DASHBOARD: 'Trang chủ',
  LIST_EVENT: 'Sự kiện Promotion quý 4',
  CREATE_EVENT: 'Tạo mới sự kiện',
  VIEW_EVENT: 'Xem sự kiện',
  LIST_REGISTER_EVENT: 'List register event',
  LIST_POLICY_CATEGORY: 'List category policy',
  ADD_POLICY_CATEGORY: 'Add category',
  LIST_ENTERPRISE_CATEGORY: 'List category enterprise',
  CATEGORY_ENTERPRISE_LIST: 'List category enterprise ',
  CATEGORY_ENTERPRISE_EDIT: 'Category enterprise edit',
  CATEGORY_ENTERPRISE_NEW: 'category enterprise add new',
  SHOP_INVITATION: 'shop invitation',
  SHOP_INVITATION_lIST: 'shop invitation list',
  ADMIN_LIST: 'List admin',
  STORE_ADMIN: 'Cửa hàng định danh',

  EVENT_PROMOTION_Q4: 'Sự kiện Promotion Quý 4',

  NEW_ADMIN: 'create admin',
  EDIT_EVENT_PRIZE: 'Chỉnh sửa quà tặng sự kiện',
  LIST_EVENT_PRIZE: 'Danh sách quà tặng sự kiện',

  MANAGE_EVENT: 'Quản lý sự kiện',
  MANAGE_LIST_EVENT: 'Danh sách sự kiện',
  MANAGE_CREATE_EVENT: 'Tạo mới sự kiện',
  MANAGE_EDIT_EVENT: 'Chỉnh sửa sự kiện Q1',

  EVENT_Q1: 'Sự kiện quý 1',
  EVENT_PRIZE: 'Giải thưởng sự kiện',
  EVENT_PRIZE_LIST: 'Danh sách giải',
  EVENT_PRIZE_CREATE: 'Tạo mới giải',
  EVENT_PRIZE_EDIT: 'Chỉnh sửa giải',
  EVENT_PRIZE_DETAIL: 'Thông tin giải',

  MANAGE_GROUP_EVENT: 'Quản lý Group Event',
  LIST_GROUP_EVENT: 'Danh sách Group Event',
  CREATE_GROUP_EVENT: 'Tạo Group Event',
  EDIT_GROUP_EVENT: 'Chỉnh sửa Group Event',

  EVENT_HISTORY_PRIZE : 'Lịch sử trúng giải',

};

export const CACHE_TIME = 2 * 1000 * 60;


export const FORMAT_DATE_FILTER = 'MM-DD-YYYY HH:mm:ss'

export const FORMAT_DATE_NEWS = 'MM-dd-yyyy HH:mm:ss';
export const FORMAT_DATE = 'dd-MM-yyyy HH:mm:ss';

