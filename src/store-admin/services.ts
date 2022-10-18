import { AxiosResponse } from 'axios';
import { API_STORE_ADMIN } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IDataStore, IStoreAdminSearchParams } from './interfaces';

export const getStoreAdmin = (params: IStoreAdminSearchParams) : Promise<IDataStore> => {
  const data: Promise<IDataStore> = axiosInstance.get(`${API_STORE_ADMIN}`, { params })
  return data;
};

export const deleteStoreAdmin = (ids: number[]) => {
  const data = axiosInstance.delete(`${API_STORE_ADMIN}/${ids}`, { data: { id: ids } });
  return data;
};
