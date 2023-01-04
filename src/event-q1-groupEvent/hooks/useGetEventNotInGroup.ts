import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IListGroupEventParams } from '../interfaces';
import { getEventNotInGroup, getListGroupEvents } from '../services';


export function useGetEventNotInGroup() {
  return {
    ...useQuery([QUERY_KEYS.EVENT_LIST_GROUP_EVENT], () => getEventNotInGroup()),
  };
}
