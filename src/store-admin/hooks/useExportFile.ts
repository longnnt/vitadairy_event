import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { exportStoreAdmin } from '../services';

export const useExportFile = () => {
  return {
    ...useQuery([QUERY_KEYS.STORE_ADMIN_EXPORT], exportStoreAdmin),
  };
};
