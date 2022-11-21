import uuidv4 from 'src/common/utils/uuidv4';

export const TABLE_HEAD = [
  {
    id: 'nameEvent',
    label: 'Tên sự kiện',
    align: 'left',
  },
  {
    id: 'startDate',
    label: 'Ngày bắt đầu',
    align: 'left',
  },
  {
    id: 'endDate',
    label: 'Ngày kết thúc',
    align: 'left',
  },
  {
    id: 'option',
    label: 'Tùy chọn',
    align: 'left',
  },
];

export const TABLE_HEAD_PRODUCT_CODE = [
  {
    id: 'productCode',
    label: 'Mã sản phẩm',
    align: 'left',
  },
];

export const defaultValues = {
  name: '',
  startDate: null,
  endDate: null,
  skus: [] as string[],
  defaultWinRate: 0,
  upRate: 0,
  downRate: 0,
  userRegisterDate: null,
  userLimit: 0,
  typeUser: '',
};

export const DEFAULT_EDIT_VALUE = {
  name: '',
  startDate: undefined,
  endDate: undefined,
  skus: [] as string[],
  defaultWinRate: 0,
  upRate: 0,
  downRate: 0,
  userRegisterDate: undefined,
  userLimit: 0,
  typeUser: '',
};

export const DEFAULT_LOADING_SIZE = 5;