import {
  Box, Card,
  Grid, Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/system';
import { useEffect } from 'react';
import { RHFSwitch, RHFTextField } from 'src/common/components/hook-form';
import useTable from 'src/common/hooks/useTable';
import { useDispatch } from 'src/common/redux/store';
import { RHFSelectPagitnation } from 'src/event/edit-event-prize/components/RHFSelectPagination';
import { getAllTransactionType } from 'src/event/edit-event-prize/service';
import { SIZE_PAGE } from '../../constants';
import {
  setTransactionType
} from '../../event.slice';
import { useGetAllTranSacTion } from '../../hooks/useGetAllTranSacTion';
import { ITransactionParams } from '../../interfaces';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

function NotificationOverviewForm() {
  const dispatch = useDispatch();
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    selected: selectedRows,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const searchParamsPaginate: ITransactionParams = {
    page: 0,
  };
  const searchParams: ITransactionParams = {
    page: page + 1,
    size: SIZE_PAGE,
  };
  const { data: addTransaction } = useGetAllTranSacTion(searchParams);

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

  return (
    <Grid item xs={6}>
      <LabelStyle>Thông báo tổng quan</LabelStyle>
      <Card sx={{ p: 2, width: '100%' }}>
        <Stack spacing={3}>
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

          <Box sx={{ zIndex: 1001 }}>
            <RHFSelectPagitnation
              name={'transactionTypeId'}
              placeholder="Transaction type"
              getAsyncData={getAllTransactionType}
              searchParams={searchParamsPaginate}
            />
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
          <Typography marginTop={2}>Trạng thái quà</Typography>
          <RHFSwitch name="giftStatus" key={'giftStatus'} label="" />
        </Stack>
      </Card>
    </Grid>
  );
}

export default NotificationOverviewForm;
