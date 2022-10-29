import { API_LIST_PRiZE, API_STORE_ADMIN } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IDataListPrize, IListPrizeParams } from './interfaces';

export const getListPrize = (params: IListPrizeParams) => {
  return axiosInstance.get<unknown, IDataListPrize>(`${API_LIST_PRiZE}`, { params });
};

export const deleteListPrizeAdmin = (id: string) => {
  return axiosInstance.delete(`${API_LIST_PRiZE}/${id}`);
};
