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
} from '../../admin.slice';
import { useDeleteAdmin } from '../../hooks/useDeleteAdmin';

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

  const mutationDelete = useDeleteAdmin ({
    onSuccess: () => showSuccessSnackbar('Xóa sự kiện thành công'),
    onError: () => showErrorSnackbar('Xóa sự kiện thất bại'),
  });

  const handleAgree = () => {
    
    for (let i = 0; i < selectedIdsValue.length; i++) {
        mutationDelete.mutate(selectedIdsValue[i]);
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
