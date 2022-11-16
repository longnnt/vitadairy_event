import * as Yup from 'yup';
import { IEventDetailProvinces } from './common/interface';

export const eidtEventPrizevalidate = (provinceIds: number[]) => {
  const eventDetailProvincesSchema = Yup.object().shape({
    endDate: Yup.string()
      .required('This field is required')
      .typeError('Must be a string'),
    provinceId: Yup.number()
      .required()
      .typeError('Must be a number')
      .test('test province id', 'this field is required', (val) =>
        provinceIds.includes(val as number)
      ),
    quantity: Yup.mixed(),
    startDate: Yup.string()
      .required('This field is required')
      .typeError('Must be a string'),
  });

  const eidtEventPrizeSchema = Yup.object().shape({
    giftId: Yup.number().required('This field is required').typeError('Must be a number'),
    popupCode: Yup.string()
      .typeError('Must be a string')
      .required('This field is required')
      .test('test empty', 'Content is required', (val) => val !== ''),
    popupImageLink: Yup.string()
      .required('This field is required')
      .typeError('Must be a string'),
    popupLink: Yup.string()
      .required('This field is required')
      .typeError('Must be a string'),
    popupType: Yup.string()
      .required('This field is required')
      .typeError('Must be a string'),

    notificationContent: Yup.string()
      .required('This field is required')
      .typeError('Must be a string')
      .test('test empty', 'Content is required', (val) => val !== '<p><br></p>'),
    notificationDescription: Yup.string()
      .required('This field is required')
      .typeError('Must be a string'),
    notificationTitle: Yup.string()
      .required('This field is required')
      .typeError('Must be a string'),

    ordinal: Yup.number()
      .required('This field is required')
      .typeError('Must be a number'),
    probability: Yup.number()
      .required('This field is required')
      .typeError('Must be a number'),
    quantity: Yup.number()
      .required('This field is required')
      .typeError('Must be a number'),
    transactionTypeId: Yup.number()
      .required('This field is required')
      .typeError('Must be a number'),
    winnerAmount: Yup.number().required('This field is required'),

    eventDetailProvinces: Yup.lazy((value: IEventDetailProvinces) => {
      const validationObject: any = {};
      Object.keys(value).map((item) => {
        validationObject[item] = eventDetailProvincesSchema;
      });

      return Yup.object()
        .shape({ ...validationObject })
        .required();
    }),
  });
  return eidtEventPrizeSchema;
};
