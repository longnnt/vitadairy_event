import { API_STORE_ADMIN } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IDataStore, IStoreAdminSearchParams } from './interfaces';

export const getStoreAdmin = async (params: IStoreAdminSearchParams) => {
  const data = (await (
    await axiosInstance.get(`${API_STORE_ADMIN}`, { params })
  ).data) as IDataStore;
  return data;
};

export const deleteStoreAdmin = (ids: number[]) => {
  const data = axiosInstance.delete(`${API_STORE_ADMIN}/${ids}`, { data: { id: ids } });
  return data;
};
