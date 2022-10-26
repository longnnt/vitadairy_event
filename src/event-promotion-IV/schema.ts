import * as yup from 'yup';

export const schemaAddEvent = yup
  .object()
  .shape({
    nameEvent: yup
      .string()
      .required('Vui lòng nhập thông tin vào ô trống')
      .max(200, 'Dữ liệu không hợp lệ. Tên sự kiện có độ dài tối đa 200 kí tự'),
    startDate: yup.mixed().required('Vui lòng nhập thông tin vào ô trống'),
    endDate: yup.mixed().required('Vui lòng nhập thông tin vào ô trống'),
    skus: yup
      .array()
      .of(yup.string())
      .required('Vui lòng nhập thông tin vào ô trống')
      .min(1, 'Vui lòng chọn ít nhất một mã sản phẩm'),
    defaultWinRate: yup
      .number()
      .required('Vui lòng nhập thông tin vào ô trống')
      .min(1, 'Kí tự từ 1 tới 100')
      .max(100, 'Kí tự từ 1 tới 100'),
    upRate: yup
      .number()
      .required('Vui lòng nhập thông tin vào ô trống')
      .min(1, 'Kí tự từ 1 tới 100')
      .max(100, 'Kí tự từ 1 tới 100'),
    downRate: yup
      .number()
      .required('Vui lòng nhập thông tin vào ô trống')
      .min(1, 'Kí tự từ 1 tới 100')
      .max(100, 'Kí tự từ 1 tới 100'),
    userRegisterDate: yup.mixed().required('Vui lòng nhập thông tin vào ô trống'),
    userLimit: yup.number().required('Vui lòng nhập thông tin vào ô trống').moreThan(0),
  })
  .required();
