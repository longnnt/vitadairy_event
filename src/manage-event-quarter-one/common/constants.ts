export const TABLE_HEAD = [
  { id: 'id', label: 'ID', align: 'left', flex: 1 },
  { id: 'event', label: 'Sự kiện', align: 'left', flex: 1 },
  { id: 'groupEvent', label: 'Nhóm sự kiện', align: 'left', flex: 1 },
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
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  IN_ACTIVE: 'IN_ACTIVE',
};

export const SEARCH_BY = {
  ALL: 'ALL',
  EVENT: 'EVENT',
  GROUP_EVENT: 'GROUP_EVENT',
};
