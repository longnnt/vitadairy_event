import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
}

export default function AlertConfirmDelete({ open, handleClose, handleConfirm }: Props) {
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
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    Bạn có chắc chắn muốn Xóa giải này không?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Thao tác này sẽ không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleConfirm}
                        autoFocus
                        color="error"
                        variant='contained' >
                        Xóa
                    </Button>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        color="inherit"
                    >Hủy bỏ</Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}
