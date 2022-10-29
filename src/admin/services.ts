import { API_ADMIN } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IResAdmins, IAdminParams, IFormAdmin } from './interfaces';

export const getAdmin = async (params: IAdminParams) => {
  return axiosInstance.get<unknown, IResAdmins>(`${API_ADMIN}`, { params });
};

export const deleteAdmin = (id: number) => {
  const data = axiosInstance.delete(`${API_ADMIN}/${id}`, { data: { id: id } });
  return data;
};

export const addAllNewAccount = (data: IFormAdmin) => {
  return axiosInstance.post(API_ADMIN, data);
};

export const getAdminById = (id: number) => axiosInstance.get(`${API_ADMIN}/${id}`);
export const editAdmin = ({ data, id }: { data: IFormAdmin; id: number }) =>
  axiosInstance.put(`${API_ADMIN}/${id}`, data);
