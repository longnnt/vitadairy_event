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
  startDate: new Date(),
  endDate: new Date(),
  skus: [] as string[],
  defaultWinRate: 0,
  upRate: 0,
  downRate: 0,
  typeUser: '',
  userRegisterDate: new Date(),
  userLimit: 0,
  id: 100,
};
