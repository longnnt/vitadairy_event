import { API_STORE_ADMIN, API_STORE_ADMIN_EXPORT } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IDataStore, IStoreActive, IStoreParams } from './interfaces';

export const getStoreAdmin = (params: IStoreParams) => {
  return axiosInstance.get<unknown, IDataStore>(`${API_STORE_ADMIN}`, { params });
};

export const deleteStoreAdmin = (id: string) => {
  return axiosInstance.delete(`${API_STORE_ADMIN}/${id}`);
};

export const getActiveStore = (params: IStoreActive) => {
  return axiosInstance.patch<unknown, IStoreActive>(
    `${API_STORE_ADMIN}/${params.code}/active`,
    null,
    { params: { isActive: params.isActive } }
  );
};

export const importStoreAdmin = (formData: FormData) => {
  return axiosInstance.post(`${API_STORE_ADMIN}/import/csv`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const exportStoreAdmin = () => {
  return axiosInstance.get(API_STORE_ADMIN_EXPORT);
};
