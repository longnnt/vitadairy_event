import { useGetProductCode } from './useGetProductCode';
import useMessage from 'src/store-admin/hooks/useMessage';

export const useProductCode = (searchParams: any) => {
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { data: productCode } = useGetProductCode({
    params: searchParams,
    callback: {
      onSuccess: () => showSuccessSnackbar('Tải mã sản phẩm thành công'),
      onError: () => showErrorSnackbar('Tải mã sản phẩm thất bại'),
    },
  });

  const productData = productCode?.data.response.response || [];

  const skusListData = productData.map((item: any) => item.code);
  return skusListData;
};
