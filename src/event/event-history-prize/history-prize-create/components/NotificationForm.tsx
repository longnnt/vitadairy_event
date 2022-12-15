import { Grid } from '@mui/material';
import { RHFTextField } from 'src/common/components/hook-form';

export function NotificationForm() {
  return (
    <Grid>
    <RHFTextField
        name="notificationTitle"
        key={'notificationTitle'}
        label="Tiêu đề thông báo*"
        margin="dense"
    />
    <RHFTextField
        name={'notificationDescription'}
        key={'notificationDescription'}
        label="Nội dung thông báo*"
        margin="dense"
    />
    <RHFTextField
        name="notificationContent"
        key={'notificationContent'}
        label="Mô tả thông báo*"
        margin="dense"
        multiline
        rows={7}
    />
    </Grid>
  );
}

export default NotificationForm;
