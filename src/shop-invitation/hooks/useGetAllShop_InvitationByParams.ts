import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParams_Query } from '../interfaces';
import { getAllShop_InvitationByparams } from '../services';

export const useGetAllShop_InvitationByParams = (params: IParams_Query) => {
  return {
    ...useQuery([QUERY_KEYS.SHOP_INVITATION_LIST, params], () =>
      getAllShop_InvitationByparams(params)
    ),
  };
};
