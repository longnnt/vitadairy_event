import * as yup from 'yup';

export const schemaAddManageEvent = yup
  .object()
  .shape({
    name: yup.string().required('Vui lòng nhập tên sự kiện'),
    startDate: yup.date().typeError('Vui lòng chọn ngày bắt đầu'),
    endDate: yup.date().typeError('Vui lòng chọn ngày kết thúc').min(
      yup.ref('startDate'),
      "Ngày kết thúc phải sau ngày bắt đầu"
    ),
    eventCustomerLimit: yup.number().required('Vui lòng nhập số giải').transform((value) => (isNaN(value) ? undefined : value)),
    eventStoreLimit: yup.number().required('Vui lòng nhập số giải').transform((value) => (isNaN(value) ? undefined : value)),
    skus: yup
      .array()
      .of(yup.mixed())
      .required('Vui lòng nhập thông tin vào ô trống')
      .min(1, 'Vui lòng chọn ít nhất một mã sản phẩm'),
    defaultWinRate: yup
      .number()
      .required('Vui lòng nhập số 0 - 100')
      .min(0, 'Vui lòng nhập số 0 - 100')
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(100, 'Vui lòng nhập số 0 - 100'),
    upRate: yup
      .number()
      .required('Vui lòng nhập số 0 - 100')
      .min(0, 'Vui lòng nhập số 0 - 100')
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(100, 'Vui lòng nhập số 0 - 100'),
    downRate: yup
      .number()
      .required('Vui lòng nhập số 0 - 100')
      .min(0, 'Vui lòng nhập số 0 - 100')
      .transform((value) => (isNaN(value) ? undefined : value))
      .max(100, 'Vui lòng nhập số 0 - 100'),
  })
  .required();
