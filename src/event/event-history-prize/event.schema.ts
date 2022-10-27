import * as Yup from 'yup';

export const eventDetailProvincesSchema = Yup.object().shape({
  endDate: Yup.string().required('This field is requiered'),
  provinceId: Yup.number().required('This field is requiered'),
  quantity: Yup.number().required('This field is requiered'),
  startDate: Yup.string().required('This field is requiered'),
});

export const eventPrizeSchema = Yup.object().shape({
  giftId: Yup.number().required('This field is requiered'),
  // popupCode: Yup.string().required('This field is requiered'),
  popupImageLink: Yup.string().required('This field is requiered'),
  popupLink: Yup.string().required('This field is requiered'),
  // popupType: Yup.string().required('This field is requiered'),

  notificationContent: Yup.string()
    .required('This field is requiered')
    .test('test empty', 'Content is required', (val) => val !== '<p><br></p>'),
  notificationDescription: Yup.string().required('This field is requiered'),
  notificationTitle: Yup.string().required('This field is requiered'),

  ordinal: Yup.number().required('This field is requiered'),
  probability: Yup.number().required('This field is requiered'),
  quantity: Yup.number().required('This field is requiered'),
  transactionTypeId: Yup.number().required('This field is requiered'),
  winnerAmount: Yup.number().required('This field is requiered'),

  eventDetailProvinces: Yup.array()
    .of(eventDetailProvincesSchema)
    .required('This field is requiered'),
});
