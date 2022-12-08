import * as Yup from 'yup';

export const EditStoreAdminSchema = Yup.object().shape({
  name: Yup.string().required('This field is required'),
  code: Yup.string().required('This field is required'),
  address: Yup.string().required('This field is required'),
  phoneNumber: Yup.string().min(10, 'Phone number must be greater than 10 characters'),
});
