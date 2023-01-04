import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IListGroupEventParams } from '../interfaces';
import { getGroupEventById, getListGroupEvents } from '../services';


export function useGetGroupEventById({id}:{id: number}) {
  return {
    ...useQuery([QUERY_KEYS.GROUP_EVENT_BY_ID, id], () => getGroupEventById(id)),
  };
}
