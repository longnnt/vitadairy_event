import * as yup from 'yup';

export const schemaAddEditGroupEvent = yup
  .object()
  .shape({
    name: yup
      .string()
      .required('Vui lòng nhập thông tin vào ô trống')
      .max(200, 'Dữ liệu không hợp lệ. Tên sự kiện có độ dài tối đa 200 kí tự'),
    events: yup
      .array()
      .of(yup.mixed())
      .required('Vui lòng nhập thông tin vào ô trống')
      .min(1, 'Vui lòng chọn ít nhất một mã sản phẩm'),
  })
  .required();
