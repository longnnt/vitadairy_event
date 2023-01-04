import * as yup from 'yup';

export const schemaAddManageEvent = yup
  .object()
  .shape({
    nameEvent: yup.string().required('Vui lòng nhập tên sự kiện'),
    nameGroupEvent: yup.string().required('Vui lòng nhập tên nhóm sự kiện'),
    startDate: yup.mixed().required('Vui lòng chọn ngày bắt đầu'),
    endDate: yup.mixed().required('Vui lòng chọn ngày kết thúc'),
    prizeWinningUser: yup.number().required('Vui lòng nhập số giải').transform((value) => (isNaN(value) ? undefined : value)),
    prizeWinningShop: yup.number().required('Vui lòng nhập số giải').transform((value) => (isNaN(value) ? undefined : value)),
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
    eventGroupId: yup.object().shape({
      value: yup.number().required(),
      label:yup.string().required()
    }),
    endDate: yup.date().typeError('Vui lòng chọn ngày kết thúc').min(
      yup.ref('startDate'),
      "Ngày kết thúc sau ngày bắt đầu"
    ),
    startDate: yup.date().typeError('Vui lòng chọn ngày bắt đầu'),
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
