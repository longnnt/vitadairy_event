import { IGiftParams } from './interface';

export const HEAD_LABELS = [
  {
    id: 'id',
    label: 'ID',
    align: 'center',
  },
  {
    id: 'name',
    label: 'Tên giải',
    align: 'center',
  },
  {
    id: 'count_prize',
    label: 'Số lượng tổng giải',
    align: 'center',
  },
  {
    id: 'start_time',
    label: 'Ngày bắt đầu',
    align: 'center',
  },
  {
    id: 'end_date',
    label: 'Ngày kết thúc',
    align: 'center',
  },
  {
    id: 'time_win_prize',
    label: 'Thứ tự trúng giải',
    align: 'center',
  },
  {
    id: 'actions',
    label: '',
    align: 'right',
  },
];

export const paramsProvince = {
  page: 0,
  size: 1000,
  type: 'PROVINCE',
};

export const searchParamsGift: IGiftParams = {
  keySearch: '',
};

export const ACCEPT_FILE_IMPORT = ['csv'];

export const COLUMNS_HEADERS: Array<string> = [
  'provinceName',
  'provinceId',
  'quantity',
  'startDate',
  'endDate',
];
