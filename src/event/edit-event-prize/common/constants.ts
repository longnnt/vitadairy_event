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
const DEDAULT_PROVINCE = {
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
