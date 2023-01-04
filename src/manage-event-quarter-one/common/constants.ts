export const TABLE_HEAD = [
  { id: 'id', label: 'ID', align: 'left', flex: 1 },
  { id: 'name', label: 'Sự kiện', align: 'left', flex: 1 },
  { id: 'groupName', label: 'Nhóm sự kiện', align: 'left', flex: 1 },
  { id: 'startDate', label: 'Ngày bắt đầu', align: 'left', flex: 1 },
  { id: 'endDate', label: 'Ngày kết thúc', align: 'left', flex: 1 },
  {
    id: 'eventCustomerLimit',
    label: 'Giới hạn trúng giải trên tệp người dùng',
    align: 'left',
    flex: 1,
  },
  {
    id: 'eventStoreLimit',
    label: 'Giới hạn trúng giải trên tệp cửa hàng',
    align: 'left',
    flex: 1,
  },
  { id: 'status', label: 'Trạng thái', align: 'left', flex: 1 },
  { id: '', label: 'Tùy chọn' },
];

export const FORMAT_DATE_EVENT = 'DD-MM-YYYY';

export enum STATUS {
  ACTIVE= 'ACTIVE',
  IN_ACTIVE= 'IN_ACTIVE',
};

export const SEARCH_BY = {
  EVENT_NAME: 'EVENT_NAME',
  EVENT_GROUP_NAME: 'EVENT_GROUP_NAME',
};

export const defaultValues = {
  name: '',
  eventGroupId: null,
  startDate: null,
  endDate: null,
  eventCustomerLimit: null,
  eventStoreLimit: null,
  status: false,
  skus: [],
  defaultWinRate: null,
  downRate: null,
  upRate: null,
};

