import * as yup from 'yup';

export const schemaAddManageEvent = yup
  .object()
  .shape({
name: yup.string().required('Vui lòng nhập tên sự kiện'),
startDate: yup.date()
      .required('Vui lòng nhập thông tin')
      .typeError('Vui lòng nhập thông tin'),
      endDate: yup.date()
      .required('Vui lòng nhập thông tin')
      .typeError('Vui lòng nhập thông tin')
      .when('startDate', (eventStartDate, schema) => {
        return (
          eventStartDate &&
          schema.test(
            'test date',"Ngày kết thúc phải sau ngày bắt đầu",
            (val: string) => new Date(val).getTime() > new Date(eventStartDate).getTime()
          )
        );
      }),
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

export const schemaEditManageEvent = yup
  .object()
  .shape({
    name: yup.string().required('Vui lòng nhập tên sự kiện'),
    startDate: yup.string()
      .required('Vui lòng nhập thông tin')
      .typeError('Vui lòng nhập thông tin'),
      endDate: yup.string()
      .required('Vui lòng nhập thông tin')
      .typeError('Vui lòng nhập thông tin')
      .when('startDate', (eventStartDate, schema) => {
        return (
          eventStartDate &&
          schema.test(
            'test date',"Ngày kết thúc phải sau ngày bắt đầu",
            (val: string) => new Date(val).getTime() > new Date(eventStartDate).getTime()
          )
        );
      }),
    eventCustomerLimit: yup.number().required().typeError('Vui lòng chọn giới hạn trúng giải người dùng').min(1, 'Vui lòng nhập số giải'),
    eventStoreLimit: yup.number().required().typeError('Vui lòng chọn giới hạn trúng giải cửa hàng').min(1, 'Vui lòng nhập số giải'),
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
