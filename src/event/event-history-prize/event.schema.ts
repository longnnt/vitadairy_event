import * as Yup from 'yup';
// import * as Yup from './interfaces';
import { POPUP_CODE } from './constants';
import { IFormCreateEvent } from './interfaces';
import { useSelector } from 'src/common/redux/store';
import { popUpCodeSelector, popUpTypeSelector } from './event.slice';
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
    popupTitle: Yup.string().when('popupCode', (popupCode, schema) => {
      return schema
        .test('test emty', 'This field is required', (val: any) => {
          if (
            (popupCode === POPUP_CODE.OGGI || popupCode === POPUP_CODE.PUZZLE_PIECE) &&
            val === ''
          ) {
            return false;
          }
          return true;
        })
        .test(
          'test lon hon 25 va nho hon 60',
          'This field is greater than 25 and less than 60 characters',
          (val: any) => {
            if (popupCode !== POPUP_CODE.FULL_SCREEN && val === '') {
              return false;
            }
            if (
              popupCode !== POPUP_CODE.FULL_SCREEN &&
              (val.length < 25 || val.length > 60)
            ) {
              return false;
            }
            return true;
          }
        );
    }),
    popupContent: Yup.string().when('popupCode', (popupCode, schema) => {
      return schema
        .test('test emty', 'This field is required', (val: any) => {
          if (
            (popupCode === POPUP_CODE.OGGI || popupCode === POPUP_CODE.PUZZLE_PIECE) &&
            val === ''
          ) {
            return false;
          }
          return true;
        })
        .test('test nho hon 81', 'This field is less than 81 characters', (val: any) => {
          if (
            (popupCode === POPUP_CODE.OGGI || popupCode === POPUP_CODE.PUZZLE_PIECE) &&
            val === ''
          ) {
            return false;
          }
          if (val.length > 81) {
            return false;
          }
          return true;
        });
    }),
    popupText: Yup.string().when('popupCode', (popupCode, schema) => {
      return schema.test('test text', 'This field is requried', (val: any) => {
        if (
          (popupCode === POPUP_CODE.OGGI || popupCode === POPUP_CODE.OGGI) &&
          val === ''
        ) {
          return false;
        }
        return true;
      });
    }),
    giftStatus: Yup.boolean(),
    popupCode: Yup.string().required('This field is required'),
    popupType: Yup.string().required('This field is required'),
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
    transactionTypeId: Yup.mixed().required('This field is required'),
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
