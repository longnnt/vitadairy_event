import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getAllShopInvitation } from '../services';

export const useGetAllShopInvitation = () => {
  return {
    ...useQuery([QUERY_KEYS.SHOP_INVITATION_LIST], getAllShopInvitation),
  };
};
