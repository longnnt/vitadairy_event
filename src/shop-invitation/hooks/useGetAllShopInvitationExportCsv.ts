import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IParamsQuery } from '../interfaces';
import { getAllShopInvitationExport } from '../services';

export const useGetAllShopInvitationExportCsv = (params: IParamsQuery) => {
  return {
    ...useQuery([QUERY_KEYS.SHOP_INVITATION_EXPORTCSV, params], () =>
      getAllShopInvitationExport(params)
    ),
  };
};
