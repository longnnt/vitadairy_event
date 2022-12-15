import { Box, Card, FormHelperText, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/system';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { RHFSwitch, RHFTextField } from 'src/common/components/hook-form';
import { RHFSelectPaginationSingle } from 'src/common/components/hook-form/RHFSelectPaginationSingle';
import { useDispatch } from 'src/common/redux/store';
import { getAllTransactionType } from 'src/event/edit-event-prize/service';
import { setTransactionType } from '../../event.slice';
import { IFormCreate, ITransactionParams } from '../../interfaces';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

function NotificationOverviewForm() {
  const dispatch = useDispatch();
  const searchParamsPaginate: ITransactionParams = {
    page: 0,
  };

  useEffect(() => {
    dispatch(
      setTransactionType({
        id: 0,
        code: '',
        name: '',
        description: '',
        mainCode: '',
      })
    );
  }, []);

  const methods = useFormContext<IFormCreate>();
  const {
    reset,
    setValue,
    control,
    getValues,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  return (
    <Grid item xs={6}>
      <LabelStyle>Thông báo tổng quan</LabelStyle>
      <Card sx={{ p: 2, width: '100%' }}>
        <Stack spacing={2}>
          <RHFTextField
            name={'ordinal'}
            key={'ordinal'}
            label="Thứ tự ưu tiên*"
            margin="dense"
          />
          <RHFTextField
            name="probability"
            key={'probability'}
            label="Tỉ lệ trúng quà của sự kiện(%)*"
            margin="dense"
          />
          <RHFTextField
            name="quantity"
            key={'quantity'}
            label="Tổng số lượng quà*"
            margin="dense"
          />
          <Box sx={{ zIndex: 1001, marginTop: 1 }}>
            <RHFSelectPaginationSingle
              name={'transactionTypeId'}
              placeholder="Transaction type"
              getAsyncData={getAllTransactionType}
              searchParams={searchParamsPaginate}
              error={errors}
            />
            <FormHelperText error sx={{ marginLeft: '10px' }}>
              {errors?.transactionTypeId?.message}
            </FormHelperText>
          </Box>
          <RHFTextField
            name="id"
            key={'id'}
            InputProps={{
              readOnly: true,
            }}
            label="Số lượng quà user đã trúng"
            margin="dense"
          />
          <Typography marginTop={2} color="#919EAB">Trạng thái quà</Typography>
          <RHFSwitch name="giftStatus" key={'giftStatus'} label="" />
        </Stack>
      </Card>
    </Grid>
  );
}

export default NotificationOverviewForm;
