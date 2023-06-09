import { ISelectPopup } from './interfaces';

// event table filter definition
export const ROLE_OPTIONS = ['ALL', 'FEATURE', 'NOT_FEATURE', 'WOOD'];

// event table header definition
export const TABLE_HEAD = [
  { id: 'id', label: 'Mã', align: 'left' },
  { id: 'name', label: 'Tên khách hàng', align: 'left' },
  { id: 'phoneNumber', label: 'Số điện thoại', align: 'left' },
  { id: 'prize', label: 'Quà', align: 'left' },
  { id: 'receivedDate', label: 'Ngày nhận', align: 'left' },
  { id: 'qrCode', label: 'QR', align: 'left' },
  { id: 'xCode', label: 'Mã muỗng', align: 'left' },
];

// export const TABLE_HEAD = [
//   { id: 'code', label: 'Mã định danh', align: 'left' },
//   { id: 'phoneNumber', label: 'Số điện thoại', align: 'left' },
//   { id: 'createdDate', label: 'Ngày tạo', align: 'left' },
//   { id: 'address', label: 'Địa chỉ', align: 'left' },
//   { id: 'qrLink', label: 'Link QR', align: 'left' },
//   { id: 'isActive', label: 'Active', align: 'left' },
//   { id: '' },
// ];

export const LIST_HISTORY_PRIZE = [
  {
    id: '12411251',
    name: 'Người 1',
    phoneNumber: 1241241242,
    prize: 'Quà 1',
    receivedDate: '12-02-20',
    qrCode: '2414214214',
    xCode: '012581275',
  },
  {
    id: '23123123',
    name: 'Người 2',
    phoneNumber: 1241241242,
    prize: 'Quà 1',
    receivedDate: '12-02-20',
    qrCode: '2414214214',
    xCode: '012581275',
  },
  {
    id: '95812843',
    name: 'Người 3',
    phoneNumber: 1241241242,
    prize: 'Quà 1',
    receivedDate: '12-02-20',
    qrCode: '2414214214',
    xCode: '012581275',
  },
];

export const TABLE_HEAD_REGISTER_EVENT = [
  { id: 'fullName', label: 'Full name', align: 'left' },
  { id: 'phone', label: 'Phone', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: '' },
];

export enum LANG {
  VI = 'vi',
  EN = 'en',
}

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
  eventDetailProvinces: {
    0: DEDAULT_PROVINCE,
  },
  eventId: 0,
  giftId: 0,
  notificationContent: '',
  notificationDescription: '',
  notificationTitle: '',
  ordinal: null,
  popupCode: '',
  popupImageLink: '',
  popupLink: '',
  popupType: '',
  popupTitle: '',
  popupContent: '',
  popupText: '',
  probability: null,
  quantity: null,
};

export const DEFAULT_FORM_VALUE_SUBMIT = {
  eventDetailProvinces: [DEDAULT_PROVINCE],
  eventId: 0,
  giftId: 0,
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
};

export const TABLE_HISTORY_PRIZE_EVENT = [
  { id: '1', label: 'Mã', align: 'left' },
  { id: 'name', label: 'Tên khách hàng', align: 'left' },
  { id: 'phoneNumber', label: 'Số điện thoại', align: 'left' },
  { id: 'prize', label: 'Quà', align: 'left' },
  { id: 'receivedDate', label: 'Ngày nhận', align: 'left' },
  { id: 'qrCode', label: 'QR', align: 'left' },
  { id: 'xCode', label: 'Mã muỗng', align: 'left' },
];

export const TABLE_HEAD_GIFT = [
  { id: 'image', label: 'Image', align: 'left', flex: 1 },
  { id: 'name', label: 'Name', align: 'left', flex: 1 },
  { id: 'type', label: 'Type', align: 'left', flex: 1 },
  { id: 'point', label: 'Point', align: 'left', flex: 1 },
  { id: 'total', label: 'Total', align: 'left', flex: 1 },
  { id: 'money', label: 'Money', align: 'left', flex: 1 },
  { id: 'active', label: 'Active', align: 'right', flex: 1 },
];

export const TABLE_HEAD_TRANSACTION_TYPE = [
  { id: 'id', label: 'Id', align: 'left' },
  { id: 'code', label: 'Code', align: 'left' },
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  { id: 'mainCode', label: 'MainCode', align: 'left' },
];

export const FORMAT_DATE_NEWS = 'dd/MM/yyyy hh:mm a';

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

export const popupCodeOption = [
  {
    value: POPUP_CODE.PUZZLE_PIECE,
    label: POPUP_CODE.PUZZLE_PIECE,
  },
  {
    value: POPUP_CODE.OGGI,
    label: POPUP_CODE.OGGI,
  },
];

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

export const COLUMNS_HEADERS: Array<string> = [
  'name',
  'provinceId',
  'quantity',
  'startDate',
  'endDate',
];

export enum ScrollProvinceEnum {
  SIZE_PROVINCE = 1000,
  PAGE_PROVINCE = 0,
}

export const PROVINCE = 'PROVINCE';

export enum ButtonType {
  SAVE_SUBMIT = 'saveSubmit',
  SAVE_CREATE_SUBMIT = 'saveCreateSubmit',
}

export const SuccessUploadCode = 1000;

export const FORMAT_DATE = 'DD/MM/YYYY';

export const STYLE_GIFT = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const CSV = 'csv';
export const DEFAULT_LOADING_SIZE = 5;

export const SIZE_PAGE = 10;
