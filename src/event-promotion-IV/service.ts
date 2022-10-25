import axiosInstance from 'src/common/utils/axios';
import { API_EVENT_ADMIN } from './../common/constants/apis';

export const deleteEvents = async (ids: number[]) => {
  const data = await axiosInstance.delete(API_EVENT_ADMIN, { data: { ids } });
  return data;
};

export const addNewEvent = async (formData: {}) => {
  const data = await axiosInstance.post(API_EVENT_ADMIN, formData);

  return data;
};
