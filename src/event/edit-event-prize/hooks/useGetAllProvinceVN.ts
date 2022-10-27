import { useQuery } from 'react-query';
import { getAllProvinceVN } from '../service';

export const useGetAllProvinceVN = () => {
  return {
    ...useQuery([], getAllProvinceVN),
  };
};
