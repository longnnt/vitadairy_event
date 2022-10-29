import { number } from 'yup';

export const TABLE_HEAD = [
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'firstName', label: 'First Name', align: 'left' },
  { id: 'lastName', label: 'Last Name', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];
export const defaultValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  permission: 0,
  status: '',
};

export const status = ['ACTIVE', 'INACTIVE'];
export const permission = [
  { id: 1, name: 'Chỉ xem' },
  { id: 2, name: 'Đầy đủ' },
];
export const STATUS_RES_ERR = 1000;
