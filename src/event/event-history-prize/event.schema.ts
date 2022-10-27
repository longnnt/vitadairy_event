import * as Yup from 'yup';

export const NewEventSchema = Yup.object().shape({
  eventId: Yup.number().required('eventId is required'),
  giftId: Yup.number().required('giftId is required'),
  id: Yup.number().required('id is required'),
  notificationContent: Yup.string().required('notificationContent is required'),
  notificationDescription: Yup.string().required('notificationDescription is required'),
  notificationTitle: Yup.string().required('notificationTitle is required'),
  ordinal: Yup.number().required('ordinal is required'),
  // popupCode: Yup.string().required('popupCode is required'),
  popupImageLink: Yup.string().required('popupImageLink is required'),
  popupLink: Yup.string().required('popupLink is required'),
  // popupType: Yup.string().required('popupType is required'),
  probability: Yup.number().required('probability is required'),
  quantity: Yup.number().required('quantity is required'),
  transactionTypeId: Yup.number().required('transactionTypeId is required'),
});
