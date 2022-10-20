import { API_STORE_ADMIN } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IDataStore, IImportFile, IStoreActive, IStoreParams } from './interfaces';

export const getStoreAdmin = (params: IStoreParams) => {
  return axiosInstance.get<unknown, IDataStore>(`${API_STORE_ADMIN}`, { params });
};

export const deleteStoreAdmin = (id: string) => {
  return axiosInstance.delete(`${API_STORE_ADMIN}/${id}`);
};

export const getActiveStore = (params: IStoreActive) => {
  return axiosInstance.patch<unknown, IStoreActive>(`${API_STORE_ADMIN}/${params.code}/active?isActive=${params.isActive}`);
};

export const importStoreAdmin = (params: IImportFile) => {
  return axiosInstance.post(`${API_STORE_ADMIN}/import/csv`, { params })
}