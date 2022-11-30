import * as yup from 'yup';
import { userTypeCons } from './constant';

export const schemaAddEvent = yup
  .object()
  .shape({
    name: yup
      .string()
      .required('Vui lòng nhập thông tin vào ô trống')
      .max(200, 'Dữ liệu không hợp lệ. Tên sự kiện có độ dài tối đa 200 kí tự'),
    startDate: yup.mixed().required('Vui lòng nhập thông tin vào ô trống'),
    endDate: yup.mixed().required('Vui lòng nhập thông tin vào ô trống'),
    skus: yup
      .array()
      .of(yup.mixed())
      .required('Vui lòng nhập thông tin vào ô trống')
      .min(1, 'Vui lòng chọn ít nhất một mã sản phẩm'),
    defaultWinRate: yup
      .number()
      .required('Vui lòng nhập thông tin vào ô trống')
      .min(1, 'Kí tự từ 1 tới 100')
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(100, 'Kí tự từ 1 tới 100'),
    upRate: yup
      .number()
      .required('Vui lòng nhập thông tin vào ô trống')
      .min(1, 'Kí tự từ 1 tới 100')
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(100, 'Kí tự từ 1 tới 100'),
    downRate: yup
      .number()
      .required('Vui lòng nhập thông tin vào ô trống')
      .min(1, 'Kí tự từ 1 tới 100')
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(100, 'Kí tự từ 1 tới 100'),
    userRegisterDate: yup.mixed().when('typeUser', (typeUser, schema) => {
      return schema.test('test create','Ngày tính người dùng mới không được để trống', (val: any) => {
        if (typeUser === userTypeCons.NEWUSER && val === null) {
          return false;
        }
        return true;
      });
    }),
    userLimit: yup
      .number()
      .required('Vui lòng nhập thông tin vào ô trống')
      .moreThan(0, 'Kí tự từ 1 tới 100')
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(100, 'Kí tự từ 1 tới 100'),
  })
  .required();

export const schemaEditEvent = yup
  .object()
  .shape({
    name: yup
      .string()
      .required('Vui lòng nhập thông tin vào ô trống')
      .max(200, 'Dữ liệu không hợp lệ. Tên sự kiện có độ dài tối đa 200 kí tự'),
    startDate: yup.mixed().required('Vui lòng nhập thông tin vào ô trống'),
    endDate: yup.mixed().required('Vui lòng nhập thông tin vào ô trống'),
    skus: yup
      .array()
      .of(yup.mixed())
      .required('Vui lòng nhập thông tin vào ô trống')
      .min(1, 'Vui lòng chọn ít nhất một mã sản phẩm'),
    defaultWinRate: yup
      .number()
      .required('Vui lòng nhập thông tin vào ô trống')
      .min(1, 'Kí tự từ 1 tới 100')
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(100, 'Kí tự từ 1 tới 100'),
    upRate: yup
      .number()
      .required('Vui lòng nhập thông tin vào ô trống')
      .min(1, 'Kí tự từ 1 tới 100')
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(100, 'Kí tự từ 1 tới 100'),
    downRate: yup
      .number()
      .required('Vui lòng nhập thông tin vào ô trống')
      .min(1, 'Kí tự từ 1 tới 100')
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(100, 'Kí tự từ 1 tới 100'),
    userRegisterDate: yup.mixed().when('typeUser', (typeUser, schema) => {
      return schema.test('test editS','Ngày tính người dùng mới không được để trống', (val: any) => {
        if (typeUser === userTypeCons.NEWUSER && val === null) {
          return false;
        }
        return true;
      });
    }),
    userLimit: yup
      .number()
      .required('Vui lòng nhập thông tin vào ô trống')
      .moreThan(0, 'Kí tự từ 1 tới 100')
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(100, 'Kí tự từ 1 tới 100'),
    typeUser: yup.string(),
  })
  .required();
