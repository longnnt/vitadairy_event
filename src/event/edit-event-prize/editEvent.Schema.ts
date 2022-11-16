import * as Yup from 'yup';
import { IEventDetailProvinces } from './common/interface';
import { POPUP_CODE } from './common/constants';

export const eidtEventPrizevalidate = (provinceIds: number[]) => {
  const eventDetailProvincesSchema = Yup.object().shape({
    endDate: Yup.string()
      .required('This field is required')
      .typeError('Must be a string')
      .when('startDate', (eventStartDate, schema) => {
        return (
          eventStartDate &&
          schema.test('test date', (val: string) => val > eventStartDate)
        );
      }),
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
    popUpCodeTitle: Yup.string()
      .max(60, 'Title must be less than 60 characters')
      .min(25, 'Title must be greater than 25 characters')
      .matches(/^[a-zA-Z0-9]+$/, 'Title must not includes any special characters')
      .when('popupCode', (popupCode, schema) => {
        if (popupCode === POPUP_CODE.OGGI || popupCode === POPUP_CODE.PUZZLE_PIECE) {
          return schema.required();
        }
      }),
    popUpCodeContent: Yup.string()
      .max(81, 'Content must be less than 81 characters')
      .matches(/^[a-zA-Z0-9]+$/, 'Content must not includes any special characters')
      .when('popupCode', (popupCode, schema) => {
        if (popupCode === POPUP_CODE.OGGI || popupCode === POPUP_CODE.PUZZLE_PIECE) {
          return schema.required();
        }
      }),
    popUpCodeCTA: Yup.string().when('popupCode', (popupCode, schema) => {
      if (popupCode === POPUP_CODE.OGGI || popupCode === POPUP_CODE.PUZZLE_PIECE) {
        return schema.required();
      }
    }),
    giftStatus: Yup.boolean(),
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
