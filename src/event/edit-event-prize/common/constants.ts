export const POPUP_TYPE = {
  DEEP_LINK: 'DEEP_LINK',
  HTML_LINK: 'HTML_LINK',
  NULL: 'NULL',
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
};
export const DEFAULT_FORM_VALUE = {
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
  transactionTypeId: 0,
  winnerAmount: 0,
};

export const NO_ID = 0;
export const DATE_FORMAT = 'dd/MM/yyyy hh:mm a';
export const PROVINCE_ID = [
  12177, 12178, 12179, 12182, 12181, 12180, 70, 12, 31, 61, 43, 68, 60, 58, 56, 50, 46,
  73, 26, 15, 29, 64, 14, 74, 52, 13, 34, 39, 22, 32, 30, 71, 48, 69, 51, 19, 62, 17, 55,
  24, 35, 38, 36, 49, 27, 47, 40, 44, 45, 25, 41, 72, 20, 37, 33, 23, 42, 63, 65, 16, 57,
  66, 28, 21, 18, 53, 54, 59, 67,
];
