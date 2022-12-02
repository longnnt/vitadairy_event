import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import * as Yup from 'yup';
import { FormValuesProps, IResetPassword } from '../../login/interface';
import { forgotPassword } from '../services';
import useShowSnackbar from 'src/store-admin/hooks/useMessage';
import { statusEnum } from 'src/auth/login/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_AUTH } from 'src/common/routes/paths';
import { useSelector } from 'react-redux';
import { setShowPassword, showPasswordSelector } from 'src/auth/login/login.slice';
import { dispatch } from 'src/common/redux/store';
import { IconButton, InputAdornment } from '@mui/material';
import Iconify from 'src/common/components/Iconify';

export default function ResetPassWordForm() {
  const { showErrorSnackbar } = useShowSnackbar();
  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string().min(6).required('Password is required'),
  });

  const methods = useForm<IResetPassword>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { password: '' },
  });
  const showPassword = useSelector(showPasswordSelector);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const navigate = useNavigate();
  const onSubmit = async (value: IResetPassword) => {
    try {
      const query = new URLSearchParams(window.location.search);
      const token = query.get('token');
      const param ={
        password: value.password,
        token :token
      }
      const data = await forgotPassword(param);
      if (data?.data?.meta?.status === statusEnum.SUCCESS) {
        window.location.href =PATH_AUTH.login;
      } else {
        showErrorSnackbar('Mật khẩu không thể thay đổi ! Vui lòng kiểm tra lại tài khoản');
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
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="Change password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => dispatch(setShowPassword(!showPassword))}
                    edge="end"
                  >
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Reset password
          </LoadingButton>
        </Stack>
      </FormProvider>
    </>
  );
}
