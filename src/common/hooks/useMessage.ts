import { useSnackbar } from 'notistack';
import { IShowMessage, MessageType } from 'src/store-admin/interfaces';

export default function useShowSnackbar() {
  const { enqueueSnackbar } = useSnackbar();
  function showSuccessSnackbar(message: string, config?: IShowMessage) {
    enqueueSnackbar(message, {
      variant: MessageType.SUCCESS,
      ...config,
    });
  }
  function showErrorSnackbar(message: string, config?: IShowMessage) {
    enqueueSnackbar(message, {
      variant: MessageType.ERROR,
      ...config,
    });
  }
  return { showSuccessSnackbar, showErrorSnackbar };
}
