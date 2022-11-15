import { Card, Grid, Typography } from '@mui/material';
import { RHFSelect, RHFTextField } from 'src/common/components/hook-form';
import { styled } from '@mui/material/styles';
import { useGetAllTranSacTion } from '../../hooks/useGetAllTranSacTion';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

function NotificationOverviewForm() {
  const { data: addTransaction } = useGetAllTranSacTion();
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
      </Card>
    </Grid>
  );
}

export default NotificationOverviewForm;
