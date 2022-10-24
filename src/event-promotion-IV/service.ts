import axiosInstance from 'src/common/utils/axios';
import { API_EVENT } from './../common/constants/apis';

export const deleteEvents = async (ids: number[]) => {
  const data = await axiosInstance.delete(API_EVENT, { data: { ids } });
  return data;
};
