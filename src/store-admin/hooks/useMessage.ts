import { useSnackbar } from 'notistack';
import { IShowMessage, MessageType } from '../interfaces';

export default function useMessage() {
  const { enqueueSnackbar } = useSnackbar();
  function showMessage(data: IShowMessage) {
    if (data.type === MessageType.ERROR) {
      enqueueSnackbar(data.message, {
        variant: 'error',
      });
    } else {
      enqueueSnackbar(data.message, {
        variant: 'success',
      });
    }
  }
  return { showMessage };
}
