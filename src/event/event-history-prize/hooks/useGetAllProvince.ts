import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getProvince } from '../services';

export const useGetAllProvince = () => {
  return {
    ...useQuery([QUERY_KEYS.EVENT_GET_PROVINCE], () => getProvince()),
  };
};
