import * as Yup from 'yup';

export const NewAdminSchema = Yup.object().shape({
  status: Yup.string().required('status is required'),
  permission: Yup.number().min(1).required('permission is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
});
