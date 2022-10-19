import { API_ADMIN } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IResAdmins,  IAdminParams } from './interfaces';

export const getAdmin = async (params: IAdminParams) => {
    return axiosInstance.get<unknown, IResAdmins>(`${API_ADMIN}`, { params })
};

export const deleteAdmin = (id: number) => {
  const data = axiosInstance.delete(`${API_ADMIN}/${id}`, { data: { id: id } });
  return data;
};
