import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsQuery } from '../common/interfaces';
import { getAllShopInvitationByparams } from '../services';

export const useGetAllShopInvitationByParams = (params: IParamsQuery) => {
  return {
    ...useQuery(
      [QUERY_KEYS.SHOP_INVITATION_LIST, params],
      () => getAllShopInvitationByparams(params),
      {
        select: (data) => data?.data?.response,
      }
    ),
  };
};
