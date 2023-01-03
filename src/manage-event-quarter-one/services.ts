import { API_MANAGE_EVENT } from './../common/constants/apis';
import axiosInstanceV2 from 'src/common/utils/axiosV2';
import { IDataListEvent, IManageEventParams } from './common/interface';

export const getListEventAdmin = (params: IManageEventParams) => {
  if(params.searchBy === '') {
    // @ts-ignore
    delete params['searchBy']
  }
  if(params.searchText === '') {
    // @ts-ignore
    delete params['searchText']
  }
  if(params.status === '') {
    // @ts-ignore
    delete params['status']
  }
  return axiosInstanceV2.get<unknown, IDataListEvent>(`${API_MANAGE_EVENT}`, {params});
};

export const deleteEventId = (id: number) => {
  return axiosInstanceV2.delete(`${API_MANAGE_EVENT}/${id}`);
};
