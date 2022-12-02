import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import * as Yup from 'yup';
import { FormValuesProps } from '../../login/interface';
import { forgotPassword } from '../services';
import useShowSnackbar from 'src/store-admin/hooks/useMessage';
import { statusEnum } from 'src/auth/login/constants';

export default function ForgotPassWordForm() {
  const { showSuccessSnackbar, showErrorSnackbar } = useShowSnackbar();
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (value: FormValuesProps) => {
    try {
      const data = await forgotPassword(value);

      if (data?.data?.meta?.status === statusEnum.SUCCESS) {
        showSuccessSnackbar('Please check your Email for reset password link!');
      } else {
        showErrorSnackbar('Your email is not exist!');
      }
    } catch (e) {
      return;
    }
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <RHFTextField
            name="email"
            label="Email address"
            placeholder="demo@minimals.cc"
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Send Request
          </LoadingButton>
        </Stack>
      </FormProvider>
    </>
  );
}
