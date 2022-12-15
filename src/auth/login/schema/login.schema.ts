import * as Yup from 'yup';
export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email must be a valid email address')
    .required('Email is required'),
  password: Yup.string().min(6).required('Password is required'),
});
