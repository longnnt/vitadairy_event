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
};

export const CACHE_TIME = 2 * 1000 * 60;


export const FORMATE_DATE_FILTER = 'MM/dd/yyyy HH:mm:ss'
