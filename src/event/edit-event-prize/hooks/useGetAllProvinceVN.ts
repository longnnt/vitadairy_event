import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IProvinceParams } from '../common/interface';
import { getAllProvinceVN } from '../service';

export const useGetAllProvinceVN = (params: IProvinceParams) => {
  return {
    ...useQuery([QUERY_KEYS.ALL_PROVINCE_VN, params], () => getAllProvinceVN(params), {
      select: (data) => data.data.response,
    }),
  };
};
