import { API_ADMIN } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IResAdmins,  IAdminSearchParams } from './interfaces';

export const getAdmin = async (params: IAdminSearchParams) => {
  const data = (await (
    await axiosInstance.get(`${API_ADMIN}`, { params })
  ).data) as IResAdmins;
  return data;
};

export const deleteAdmin = (ids: number[]) => {
  const data = axiosInstance.delete(`${API_ADMIN}/${ids}`, { data: { id: ids } });
  return data;
};
