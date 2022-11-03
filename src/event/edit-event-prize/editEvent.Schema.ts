import * as Yup from 'yup';

export const eidtEventPrizevalidate = (provinceId: number[]) => {
  const eventDetailProvincesSchema = Yup.object().shape({
    endDate: Yup.string().required('This field is required'),
    provinceId: Yup.number()
      .required('This field is required')
      .test('test province id', 'this field is required', (val) =>
        provinceId.includes(val as number)
      ),
    quantity: Yup.number(),
    startDate: Yup.string().required('This field is required'),
  });

  const eidtEventPrizeSchema = Yup.object().shape({
    giftId: Yup.number().required('This field is required'),
    popupCode: Yup.string()
      .required('This field is required')
      .test('test empty', 'Content is required', (val) => val !== ''),
    popupImageLink: Yup.string().required('This field is required'),
    popupLink: Yup.string().required('This field is required'),
    popupType: Yup.string().required('This field is required'),

    notificationContent: Yup.string()
      .required('This field is required')
      .test('test empty', 'Content is required', (val) => val !== '<p><br></p>'),
    notificationDescription: Yup.string().required('This field is required'),
    notificationTitle: Yup.string().required('This field is required'),

    ordinal: Yup.number().required('This field is required'),
    probability: Yup.number().required('This field is required'),
    quantity: Yup.number().required('This field is required'),
    transactionTypeId: Yup.number().required('This field is required'),
    winnerAmount: Yup.number().required('This field is required'),

    eventDetailProvinces: Yup.array()
      .of(eventDetailProvincesSchema)
      .required('This field is required'),
  });
  return eidtEventPrizeSchema;
};
