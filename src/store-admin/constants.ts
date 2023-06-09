export const TABLE_HEAD = [
  { id: 'code', label: 'Mã định danh', align: 'left', flex: 1 },
  { id: 'phoneNumber', label: 'Số điện thoại', align: 'left', flex: 1 },
  { id: 'createdDate', label: 'Ngày tạo', align: 'left', flex: 1 },
  { id: 'address', label: 'Địa chỉ', align: 'left', flex: 1 },
  { id: 'qrLink', label: 'Link QR', align: 'right', flex: 1 },
  { id: 'isActive', label: 'Active', align: 'right', flex: 1 },
  { id: '' , label: 'Action', align: 'right', flex: 1},
];

export const SUCCESS_UPLOAD_CODE = 1000;

export const FORMATE_DATE_NEW_REQ = 'MM/DD/YYYY HH:MM:ss'

export const FORMAT_DATE_NEWS = 'dd-MM-yyyy hh:mm a';

export const LIST_STORE = 'Danh sách cửa hàng';

export const SIZE = 10000;
export const FORMAT_DATE_EXPORT_FILE= 'DD_MM_YYYY';

export const defaultValues = {
  address: '',
  code: '',
  isActive: true,
  name: '',
  phoneNumber: '',
}
