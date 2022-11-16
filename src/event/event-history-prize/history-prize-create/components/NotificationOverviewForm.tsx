import { Card, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RHFSelect, RHFSwitch, RHFTextField } from 'src/common/components/hook-form';
import { useGetAllTranSacTion } from '../../hooks/useGetAllTranSacTion';
import { IGiftParams } from '../../interfaces';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

function NotificationOverviewForm() {
  const searchParams: IGiftParams = {
    page: 0,
    size: 1000,
  }
  const { data: addTransaction } = useGetAllTranSacTion(searchParams);
  const dataTransaction = addTransaction?.data?.response || [];
  const addNewTransaction = dataTransaction.map((item) => ({
    key: item.id,
    name: item.description,
  }));
  
  return (
    <Grid item xs={6}>
      <LabelStyle>Thông báo tổng quan</LabelStyle>
      <Card sx={{ p: 2, width: '100%' }}>
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
        <RHFTextField
          name="id"
          key={'id'}
          InputProps={{
            readOnly: true,
          }}
          label="Số lượng quà user đã trúng"
          margin="dense"
        />
        <RHFSelect
          name={'transactionTypeId'}
          key="transactionTypeId"
          label={'Transaction type'}
          placeholder="Transaction type"
          margin="dense"
        >
          <option value="" />
          {addNewTransaction.map((option) => (
            <option key={option.key} value={option.key}>
              {option.name}
            </option>
          ))}
        </RHFSelect>
        <Typography marginTop={2}>Trạng thái quà</Typography>
        <RHFSwitch name="giftStatus" key={'giftStatus'} label="" />
      </Card>
    </Grid>
  );
}

export default NotificationOverviewForm;
