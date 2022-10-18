import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getAllShop_Invitation } from '../services';

export const useGetAllShop_Invitation = () => {
  return {
    ...useQuery([QUERY_KEYS.SHOP_INVITATION_LIST], getAllShop_Invitation),
  };
};
