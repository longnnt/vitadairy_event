import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getAllProvinceVN } from '../service';

export const useGetAllProvinceVN = () => {
  return {
    ...useQuery([QUERY_KEYS.ALL_PROVINCE_VN], getAllProvinceVN),
  };
};
