export const TABLE_HEAD = [
  { id: 'id', label: 'ID', align: 'left', flex: 1 },
  { id: 'nameEvent', label: 'Sự kiện', align: 'left', flex: 1 },
  { id: 'nameGroupEvent', label: 'Nhóm sự kiện', align: 'left', flex: 1 },
  { id: 'startDate', label: 'Ngày bắt đầu', align: 'left', flex: 1 },
  { id: 'endDate', label: 'Ngày kết thúc', align: 'left', flex: 1 },
  {
    id: 'prizeWinningUser',
    label: 'Giới hạn trúng giải trên tệp người dùng',
    align: 'left',
    flex: 1,
  },
  {
    id: 'prizeWinningShop',
    label: 'Giới hạn trúng giải trên tệp cửa hàng',
    align: 'left',
    flex: 1,
  },
  { id: 'status', label: 'Trạng thái', align: 'left', flex: 1 },
  { id: '', label: 'Tùy chọn' },
];

export const FORMAT_DATE_EVENT = 'DD-MM-YYYY';

export const STATUS = {
  ACTIVE: 'ACTIVE',
  IN_ACTIVE: 'IN_ACTIVE',
};

export const SEARCH_BY = {
  EVENT_NAME: 'EVENT_NAME',
  EVENT_GROUP_NAME: 'EVENT_GROUP_NAME',
};

export const defaultValues = {
  nameEvent: '',
  nameGroupEvent: '',
  startDate: null,
  endDate: null,
  prizeWinningUser: null,
  prizeWinningShop: null,
  status: false,
  skus: [] as string[],
  defaultWinRate: null,
  downRate: null,
  upRate: null,
};

