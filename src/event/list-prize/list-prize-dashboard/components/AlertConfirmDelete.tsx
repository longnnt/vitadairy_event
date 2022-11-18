import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDeleteListPrizeAdmin } from '../../hooks/useDeleteListPrize';
import useShowSnackbar from '../../hooks/useCustomSnackBar';

type Props={
    open: boolean;
    handleClose:() => void;
    selectedId:string[];
    resetSelect?:() => void

}

export default function AlertDialog({open, handleClose, selectedId, resetSelect} : Props) {
  const { showSuccessSnackbar, showErrorSnackbar } = useShowSnackbar();
  const mutationDelete = useDeleteListPrizeAdmin({
    onSuccess: () => {
      showSuccessSnackbar('Delete prize successfully');
    },
    onError: () => {
      showErrorSnackbar('Delete prize fail');
    },
  });

  // const handleDeleteRows = (ids: string[]) => {
  //   for (let i = 0; i < ids.length; i++) {
  //     mutationDelete.mutate(ids[i]);
  //     resetSelect && resetSelect();
  //   }
  // };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{
          sx:{
            backgroundColor:'black!important',
            opacity:'0.2!important',
          }
        }}
      >
        <DialogTitle id="alert-dialog-title">
            Bạn có chắc muốn xóa không?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Thao tác này sẽ không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button 
            onClick={
              () => {
                // handleDeleteRows(selectedId)
                handleClose();
              }
            } 
            autoFocus 
            variant='contained' >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
