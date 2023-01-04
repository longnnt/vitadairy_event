import axiosInstanceQ1 from 'src/common/utils/axios-q1';
import { IDataListGroupEventById, IDataListGroupEvents, IListGroupEventParams } from './interfaces';
import {
  API_Q1_GET_ALL_EVENT_NOT_IN_GROUP,
  API_Q1_GET_ALL_GROUP_EVENT,
} from 'src/common/constants/apis';

export const getListGroupEvents = (params: IListGroupEventParams) => {
  return axiosInstanceQ1.get<unknown, IDataListGroupEvents>(
    `${API_Q1_GET_ALL_GROUP_EVENT}`,
    { params }
  );
};

export const getEventNotInGroup = () => {
  return axiosInstanceQ1.get<unknown, IDataListGroupEvents>(
    `${API_Q1_GET_ALL_EVENT_NOT_IN_GROUP}`
  );
};

export const addNewGroupEvent = (formData: {}) => {
  const data = axiosInstanceQ1.post<unknown, IDataListGroupEvents>(
    `${API_Q1_GET_ALL_GROUP_EVENT}`, formData
  );
  return data;
};

export const deleteGroupEvent = (id: number) =>{
    const data = axiosInstanceQ1.delete(`${API_Q1_GET_ALL_GROUP_EVENT}/${id}`)
    return data;
}

export const editGroupEvent = (formData: {}) => {
  const data = axiosInstanceQ1.put<unknown, IDataListGroupEvents>(
    `${API_Q1_GET_ALL_GROUP_EVENT}`, formData
  );
  return data;
};

export const getGroupEventById = (ids: number) => {
  return axiosInstanceQ1.get<unknown, IDataListGroupEventById>(
    `${API_Q1_GET_ALL_GROUP_EVENT}/${ids}` 

  );
};
