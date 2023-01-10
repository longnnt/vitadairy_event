
import { IDataListGroupEventById, IDataListGroupEvents, IDataResponseEventSelect, IListGroupEventParams } from './interfaces';
import {
  API_Q1_GET_ALL_EVENT_NOT_IN_GROUP,
  API_Q1_GET_ALL_GROUP_EVENT,
} from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';

export const getListGroupEvents = (params: IListGroupEventParams) => {
  return axiosInstance.get<unknown, IDataListGroupEvents>(
    `${API_Q1_GET_ALL_GROUP_EVENT}`,
    { params }
  );
};

export const getEventNotInGroup = () => {
  return axiosInstance.get<unknown, IDataResponseEventSelect>(
    `${API_Q1_GET_ALL_EVENT_NOT_IN_GROUP}`
  );
};

export const addNewGroupEvent = (formData: {}) => {
  const data = axiosInstance.post<unknown, IDataListGroupEvents>(
    `${API_Q1_GET_ALL_GROUP_EVENT}`, formData
  );
  return data;
};

export const deleteGroupEvent = (id: number) =>{
    const data = axiosInstance.delete(`${API_Q1_GET_ALL_GROUP_EVENT}/${id}`)
    return data;
}

export const editGroupEvent = (formData: {}) => {
  const data = axiosInstance.put<unknown, IDataListGroupEvents>(
    `${API_Q1_GET_ALL_GROUP_EVENT}`, formData
  );
  return data;
};

export const getGroupEventById = (ids: number) => {
  return axiosInstance.get<unknown, IDataListGroupEventById>(
    `${API_Q1_GET_ALL_GROUP_EVENT}/${ids}`

  );
};
