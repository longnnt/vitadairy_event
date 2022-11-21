import * as Yup from 'yup';
import { POPUP_CODE } from './constants';
import { IFormCreateEvent } from './interfaces';

export const createEventPrizeValidate = (provinceIds: number[]) => {
  const eventDetailProvincesSchema = Yup.object().shape({
    endDate: Yup.string()
      .required('This field is required')
      .typeError('Must be a string')
      .when('startDate', (eventStartDate, schema) => {
        return (
          eventStartDate &&
          schema.test(
            'test date',
            (val: string) => new Date(val).getTime() > new Date(eventStartDate).getTime()
          )
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

  const createEventPrizeSchema = Yup.object().shape({
    giftId: Yup.number().required('This field is required').typeError('Must be a number'),
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
    eventDetailProvinces: Yup.lazy((value: IFormCreateEvent) => {
      const validationObject: any = {};
      Object.keys(value).map((item) => {
        validationObject[item] = eventDetailProvincesSchema;
      });
      return Yup.object()
        .shape({ ...validationObject })
        .required();
    }),
  });
  return createEventPrizeSchema;
};
