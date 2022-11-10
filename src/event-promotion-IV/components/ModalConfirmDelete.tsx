import { Box, Button, Dialog, DialogActions, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'src/common/redux/store';
import useMessage from 'src/store-admin/hooks/useMessage';

import {
  confirmPopupEventState,
  selectedIdsState,
  setConfirmPopup,
  setIsResetSelect,
} from '../eventPromotionIV.slice';
import { useDeleteEvents } from '../hooks/useDeleteEvent';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AlertDialogSlide = () => {
  const confirmPopup = useSelector(confirmPopupEventState);
  const selectedIdsValue = useSelector(selectedIdsState);
  const dispatch = useDispatch();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const mutationDelete = useDeleteEvents({
    onSuccess: () => showSuccessSnackbar('Xóa sự kiện thành công'),
    onError: () => showErrorSnackbar('Xóa sự kiện thất bại'),
    onSuccessSend: () => showErrorSnackbar('Sự kiện đã có người trúng không thể xóa'),
  });

  const handleAgree = () => {
    if (selectedIdsValue.length) {
      mutationDelete.mutate(selectedIdsValue);
      dispatch(setIsResetSelect(true));
    }
    dispatch(setConfirmPopup(false));
  };

  const handleClose = () => {
    dispatch(setConfirmPopup(false));
  };

  return (
    <Box>
      <Dialog
        open={confirmPopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Bạn có muốn xóa sự kiện này không'}</DialogTitle>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Hủy bỏ
          </Button>
          <Button variant="contained" onClick={handleAgree}>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
