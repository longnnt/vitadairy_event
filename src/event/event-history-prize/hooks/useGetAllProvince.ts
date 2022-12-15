import { IProvinceParams } from './../interfaces';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IProvinceParams } from '../interfaces';
import { getProvince } from '../services';

export const useGetAllProvince = (params: IProvinceParams) => {
  return {
    ...useQuery([QUERY_KEYS.EVENT_GET_PROVINCE, params], () => getProvince(params)),
  };
};
