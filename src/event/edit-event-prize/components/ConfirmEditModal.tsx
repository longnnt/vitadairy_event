import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { dispatch } from 'src/common/redux/store';
import { setConfirmEdit } from '../editEventPrize.Slice';

export const ConfirmEditModal = ({
  open,
  handleClose,
}: //   setConfirmEdit,
{
  open: boolean;
  handleClose: () => void;
  //   setConfirmEdit: (state: boolean) => void;
}) => {
  const handleOnAgree = () => {
    handleClose();
    dispatch(setConfirmEdit(true));
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{
          sx: {
            backgroundColor: 'black!important',
            opacity: '0.2!important',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          Bạn có chắc chắn muốn lưu chỉnh sửa không?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Thao tác này sẽ không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleOnAgree} autoFocus variant="contained">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
