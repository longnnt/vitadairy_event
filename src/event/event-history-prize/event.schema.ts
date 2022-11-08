import * as Yup from 'yup';

export const createEventPrizevalidate = () => {
  const eventDetailProvincesSchema = Yup.object().shape({
    endDate: Yup.string().required('This field is requiered'),
    provinceId: Yup.number().required('This field is requiered'),
    quantity: Yup.number(),
    startDate: Yup.string().required('This field is requiered'),
  });

  const createEventPrizeSchema = Yup.object().shape({
    giftId: Yup.number().required('This field is required'),
    popupCode: Yup.string().required('This field is required'),
    popupImageLink: Yup.string().required('This field is required'),
    popupType: Yup.string()
      .required('This field is required')
      .test('testPopUpTye', 'This field is required', (value) => value !== ''),

    notificationContent: Yup.string()
      .required('This field is required')
      .test('test empty', 'Content is required', (val) => val !== '<p><br></p>'),
    notificationDescription: Yup.string().required('This field is required'),
    notificationTitle: Yup.string().required('This field is required'),

    ordinal: Yup.number().required('This field is required'),
    probability: Yup.number().required('This field is required'),
    quantity: Yup.number().required('This field is required'),
    transactionTypeId: Yup.number().required('This field is required'),

    eventDetailProvinces: Yup.array()
      .of(eventDetailProvincesSchema)
      .required('This field is required'),
  });
  return createEventPrizeSchema;
};
