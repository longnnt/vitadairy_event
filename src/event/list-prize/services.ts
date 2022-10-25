import { API_STORE_ADMIN } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IDataListPrize, IListPrizeActive, IListPrizeParams } from './interfaces';



export const getListPrize = (params: IListPrizeParams) => {
  return axiosInstance.get<unknown, IDataListPrize>(`${API_STORE_ADMIN}`, { params });
};

export const deleteListPrizeAdmin = (id: string) => {
  return axiosInstance.delete(`${API_STORE_ADMIN}/${id}`);
};

export const getActiveListPrize = (params: IListPrizeActive) => {
  return axiosInstance.patch<unknown, IListPrizeActive>(`${API_STORE_ADMIN}/${params.code}/active?isActive=${params.isActive}`);
};
