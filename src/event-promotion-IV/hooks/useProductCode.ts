import { useGetProductCode } from './useGetProductCode';
import useMessage from 'src/store-admin/hooks/useMessage';
import { IProductCode } from '../interface';

export const useProductCode = (searchParams?: any) => {
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { data: productData } = useGetProductCode({
    params: searchParams,
    callback: {
      onSuccess: () => { 
        // showSuccessSnackbar('Tải mã sản phẩm thành công')
      },
      onError: () => {
        showErrorSnackbar('Tải mã sản phẩm thất bại')
      }
    },
  });

  const productCode = productData?.data.response.response || [];
  const pagination = productData?.data.response.pagination || [];

  const skusListData = productCode.map((item: IProductCode) => ({
    code: item.code,
    id: item.id,
  }));

  return { skusListData, pagination };
};
