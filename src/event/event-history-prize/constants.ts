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
export const defaultValues = {
  thumbnail: null,
  isFeature: false,
  location: '',
  timeStart: new Date(),
  translations: {
    [LANG.VI]: {
      title: '',
      slug: '',
      shortDesc: '',
      content: '',
    },
    [LANG.EN]: {
      title: '',
      slug: '',
      shortDesc: '',
      content: '',
    },
  },
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
