import { API_MANAGE_EVENT, API_PRODUCT } from './../common/constants/apis';
import axiosInstanceV2 from 'src/common/utils/axiosV2';
import { EventSearchParams, IDataListEvent, IFormCreateEvent, IManageEventParams } from './common/interface';
import axiosInstance from 'src/common/utils/axios';

export const getListEventAdmin = (params: IManageEventParams) => {
  if(params.searchBy === '') {
    delete params['searchBy']
  }
  if(params.searchText === '') {
    delete params['searchText']
  }
  if(params.status === '') {
    delete params['status']
  }
  return axiosInstanceV2.get<unknown, IDataListEvent>(`${API_MANAGE_EVENT}`, {params});
};

export const postCreateEventAdmin = (data: IFormCreateEvent) => {
  return axiosInstanceV2.post(`${API_MANAGE_EVENT}`, data);
}

export const deleteEventId = (id: number) => {
  return axiosInstanceV2.delete(`${API_MANAGE_EVENT}/${id}`);
};

export const getProductCode = (params: EventSearchParams) => {
  return axiosInstance.get(`${API_PRODUCT}`, { params });
};