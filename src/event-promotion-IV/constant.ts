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

export const defaultValues = {
  name: '',
  startDate: null,
  endDate: null,
  skus: [],
  defaultWinRate: undefined,
  upRate: undefined,
  downRate: undefined,
  typeUser: '',
  userRegisterDate: null,
  userLimit: undefined,
  id: uuidv4(),
};
