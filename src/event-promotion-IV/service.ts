import { EventSearchParams, IEventFormData, RowProps } from './interface';
import axiosInstance from 'src/common/utils/axios';
import { API_EVENT_ADMIN, API_PRODUCT } from './../common/constants/apis';
import { AxiosResponse } from 'axios';

interface A {
  response: RowProps[];
  pagination: {
    totalPages: number;
    totalRecords: number;
    currentPage: number;
    recordsPerPage: number;
    last: boolean;
  };
}

export const getListEvent = (params: EventSearchParams) => {
  return axiosInstance.get<A, AxiosResponse<A>>(API_EVENT_ADMIN, { params });
};
export const deleteEvents = async (ids: number[]) => {
  const data = await axiosInstance.delete(API_EVENT_ADMIN, { data: { ids } });
  return data;
};
export const addNewEvent = async (formData: {}) => {
  const data = await axiosInstance.post(API_EVENT_ADMIN, formData);

  return data;
};
export const getEventById = (id: number) => {
  return axiosInstance.get(`${API_EVENT_ADMIN}/${id}`);
};

export const getProductCode = (params: EventSearchParams) => {
  return axiosInstance.get(`${API_PRODUCT}`, { params });
};

export const editEventService = async ({
  formEditData,
  id,
}: {
  id: number;
  formEditData: IEventFormData;
}) => {
  const data = await axiosInstance.patch(`${API_EVENT_ADMIN}`, formEditData);
  return data;
};
