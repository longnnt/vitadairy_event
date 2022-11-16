import { useQuery } from 'react-query';
import useMessage from 'src/store-admin/hooks/useMessage';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IGiftParams } from '../interfaces';
import { getTransactionTypeId } from '../services';
import { useGetPrizeHistory } from './useGetPrizeHistory';

export const useGetAllTranSacTion = (searchParams?: any) => {
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { data: transactionTypeData } = useGetPrizeHistory({
    params: searchParams,
    callback: {
      onSuccess: () => {
        // showSuccessSnackbar('Tải mã sản phẩm thành công')
      },
      onError: () => {
        showErrorSnackbar('Tải tracsaction type thất bại');
      },
    },
  });

  const pagination = transactionTypeData?.data?.pagination || [];
  const transactionTypeCode = transactionTypeData?.data?.response || [];

  // return {
  //   ...useQuery([QUERY_KEYS.EVENT_GET_TRANSACTION], () => getTransactionTypeId(params)),
  // };
  return { pagination, transactionTypeCode };
};
