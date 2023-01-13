import * as Yup from 'yup';
import { IFormCreateProvince } from './interface';

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
    quantity: Yup.number()
      .required('Số lượng không được để trống')
      .min(1, 'Số lượng phải lớn hơn 0'),
    startDate: Yup.string()
      .required('This field is required')
      .typeError('Must be a string'),
  });

  const createEventPrizeSchema = Yup.object().shape({
    giftId: Yup.mixed().required('Vui lòng nhập tên giải').typeError('Must be a number'),
    ordinal: Yup.number()
      .required('Vui lòng nhập thứ tự trúng giải')
      .typeError('Giá trị nhập phải là số'),
    quantity: Yup.number()
      .required('Vui lòng nhập số lượng')
      .min(1, 'Số lượng tổng giải phải lớn hơn 0')
      .typeError('Giá trị nhập phải là số'),
    crmTransactionTypeId: Yup.mixed().required('Vui lòng chọn CRM Transaction Type'),
    eventDetailProvinces: Yup.lazy((value: IFormCreateProvince) => {
      const validationObject: any = {};
      if (value !== undefined && value !== null) {
        Object.keys(value).map((item) => {
          validationObject[item] = eventDetailProvincesSchema;
        });
      }
      return Yup.object().shape({ ...validationObject });
      // .required();
    }),
  });
  return createEventPrizeSchema;
};

export const editEventPrizevalidate = (provinceIds: number[]) => {
  const eventDetailProvincesSchema = Yup.object().shape({
    endDate: Yup.string()
      .required('Ngày kết thúc không được để trống')
      .typeError('Phải là một chuỗi')
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
      .typeError('Phải là số')
      .test('test province id', 'Không được để trống', (val) =>
        provinceIds.includes(val as number)
      ),
    quantity: Yup.number()
      .required('Số lượng không được để trống')
      .min(1, 'Số lượng phải lớn hơn 0'),
    startDate: Yup.string()
      .required('Không được để trống')
      .typeError('Phải là một chuỗi'),
  });

  const editEventPrizeSchema = Yup.object().shape({
    ordinal: Yup.number()
      .required('Vui lòng nhập thứ tự trúng giải')
      .typeError('Giá trị nhập phải là số'),
    crmTransactionTypeId: Yup.mixed().required('Vui lòng chọn CRM Transaction Type'),
    eventDetailProvinces: Yup.lazy((value: IFormCreateProvince) => {
      const validationObject: any = {};
      if (value !== undefined && value !== null) {
        Object.keys(value).map((item) => {
          validationObject[item] = eventDetailProvincesSchema;
        });
      }
      return Yup.object().shape({ ...validationObject });
      // .required();
    }),
  });
  return editEventPrizeSchema;
};
