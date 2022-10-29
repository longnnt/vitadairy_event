import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsGetGift } from '../common/interface';
import { getAllGifts } from '../service';

export const useGetAllGift = (params: IParamsGetGift) => {
  return {
    ...useQuery([QUERY_KEYS.SHOP_INVITATION_LIST, params], () => getAllGifts(params)),
  };
};
