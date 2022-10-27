import { AxiosResponse } from 'axios';
import {
  API_PRIZE_EDIT,
  API_PROVINCE_VN,
  API_TRANSACTION_TYPE,
} from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import {
  IResEventPrizeById,
  IResProvince,
  IResTransactionType,
} from './common/interface';

export const getEventPrizeById = (id: number) => {
  return axiosInstance.get<IResEventPrizeById, AxiosResponse<IResEventPrizeById>>(
    API_PRIZE_EDIT + `/${id}`
  );
};

export const getAllTransactionType = () => {
  return axiosInstance.get<IResTransactionType, AxiosResponse<IResTransactionType>>(
    API_TRANSACTION_TYPE
  );
};

export const getAllProvinceVN = () => {
  return axiosInstance.get<IResProvince, AxiosResponse<IResProvince>>(API_PROVINCE_VN);
};
