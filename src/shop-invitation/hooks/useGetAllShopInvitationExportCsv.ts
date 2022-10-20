import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getAllShopInvitationExport } from '../services';

export const useGetAllShopInvitationExportCsv = () => {
  return {
    ...useQuery([QUERY_KEYS.SHOP_INVITATION_EXPORTCSV], getAllShopInvitationExport),
  };
};
