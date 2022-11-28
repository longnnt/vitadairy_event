export const POPUP_TYPE = {
  DEEP_LINK: 'DEEP_LINK',
  HTML_LINK: 'HTML_LINK',
  NULL: 'NULL',
};

export const POPUP_CODE = {
  PUZZLE_PIECE: 'PUZZLE_PIECE',
  OGGI: 'OGGI',
  FULL_SCREEN: 'FULL_SCREEN',
};

export const popupTypeOption = [
  {
    value: POPUP_TYPE.NULL,
    label: POPUP_TYPE.NULL,
  },
  {
    value: POPUP_TYPE.DEEP_LINK,
    label: POPUP_TYPE.DEEP_LINK,
  },
  {
    value: POPUP_TYPE.HTML_LINK,
    label: POPUP_TYPE.HTML_LINK,
  },
];
export const DEDAULT_PROVINCE = {
  id: 0,
  provinceId: 0,
  quantity: 0,
  startDate: new Date(),
  endDate: new Date(),
  extraquantity: 0,
  isNew: false,
};
export const DEFAULT_FORM_VALUE = {
  // eventDetailProvinces: [DEDAULT_PROVINCE],
  eventDetailProvinces: {
    0: DEDAULT_PROVINCE,
  },
  eventId: 0,
  giftId: 0,
  id: 0,
  notificationContent: '',
  notificationDescription: '',
  notificationTitle: '',
  ordinal: 0,
  popupCode: '',
  popupImageLink: '',
  popupLink: '',
  popupType: '',
  probability: 0,
  quantity: 0,
  // transactionTypeId: 0,
  // transactionTypeId: {
  //   value: 0,
  //   lable: '',
  // },
  winnerAmount: 0,
};
export const DEFAULT_FORM_VALUE_SUBMIT = {
  eventDetailProvinces: [DEDAULT_PROVINCE],
  eventId: 0,
  giftId: 0,
  id: 0,
  notificationContent: '',
  notificationDescription: '',
  notificationTitle: '',
  ordinal: 0,
  popupCode: '',
  popupImageLink: '',
  popupLink: '',
  popupType: '',
  probability: 0,
  quantity: 0,
  // transactionTypeId: 0,
  transactionTypeId: { value: 0, label: '' },
  winnerAmount: 0,
};

export const NO_ID = 0;
export const DATE_FORMAT = 'dd/MM/yyyy hh:mm a';
export const ACCEPT_FILE_IMPORT = ['csv'];

export const COLUMNS_HEADERS: Array<string> = [
  'name',
  'provinceId',
  'extraquantity',
  'startDate',
  'endDate',
];

export const GIFT_POINT = {
  GIFT: 'gift',
  POINT: 'point',
  GIFT_POINT: 'gift_point',
};
