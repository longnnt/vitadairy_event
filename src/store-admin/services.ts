import { API_STORE_ADMIN } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IDataStore, IStoreParams } from './interfaces';

export const getStoreAdmin = (params: IStoreParams) => {
  return axiosInstance.get<unknown, IDataStore>(`${API_STORE_ADMIN}`, { params });
};

export const deleteStoreAdmin = (ids: number[]) => {
  const data = axiosInstance.delete(`${API_STORE_ADMIN}/${ids}`, { data: { id: ids } });
  return data;
};
