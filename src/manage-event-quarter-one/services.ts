import {
  API_EVENT_GROUP,
  API_MANAGE_EVENT,
  API_PRODUCT,
} from './../common/constants/apis';
import {
  IEventGroupParams,
  IEventSearchParams,
  IDataListEvent,
  IPostCreateEvent,
  IManageEventParams,
  IDataListEventGroup,
  IStatusParams,
} from './common/interface';
import axiosInstance from 'src/common/utils/axios';

export const getListEventAdmin = (params: IManageEventParams) => {
  if (params.searchBy === '') {
    delete params['searchBy'];
  }
  if (params.searchText === '') {
    delete params['searchText'];
  }
  if (params.status === '') {
    delete params['status'];
  }
  return axiosInstance.get<unknown, IDataListEvent>(`${API_MANAGE_EVENT}`, { params });
};

export const postCreateEventAdmin = (data: IPostCreateEvent) => {
  return axiosInstance.post(`${API_MANAGE_EVENT}`, data);
};

export const deleteEventId = (id: number) => {
  return axiosInstance.delete(`${API_MANAGE_EVENT}/${id}`);
};

export const getProductCode = (params: IEventSearchParams) => {
  return axiosInstance.get(`${API_PRODUCT}`, { params });
};

export const getEventGroup = () => {
  return axiosInstance.get<unknown, IDataListEventGroup>(`${API_EVENT_GROUP}`);
};

export const patchEventStatus = (data: IStatusParams) => {
  return axiosInstance.patch(API_MANAGE_EVENT, data);
};
