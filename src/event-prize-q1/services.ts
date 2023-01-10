import { API_GIFT, API_PROVINCE_SEARCH_BY_FILTER, API_TRANSACTION_TYPE_UNUSE, API_EVENT_Q1_PRIZE, API_TRANSACTION_TYPE } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IResCrmTransaction, IResGift, IResProvince, IProvinceParams, IGiftParams, IFormSubmitCreate, IGiftById, IResCrmTransactionDetail } from './interface';

export const getCrmTransaction = () => {
    return axiosInstance.get<unknown, IResCrmTransaction>(`${API_TRANSACTION_TYPE_UNUSE}`, {params: {page: 0, size: 2000}})
}

export const getCrmTransactionById = (id: number) => {
    return axiosInstance.get<unknown, IResCrmTransactionDetail>(`${API_TRANSACTION_TYPE}/${id}`)
}

export const getGift = async (params: IGiftParams) => {
    return axiosInstance.get<unknown, IResGift>(`${API_GIFT}`, {params})
}

export const getProvince = (params: IProvinceParams) => {
    return axiosInstance.get<unknown, IResProvince>(`${API_PROVINCE_SEARCH_BY_FILTER}`, {params});
}

export const createEventPrize = (data: IFormSubmitCreate) => {
    return axiosInstance.post(`${API_EVENT_Q1_PRIZE}`, data);
}

export const getListPrize = (eventId: number) => {
    return axiosInstance.get(`${API_EVENT_Q1_PRIZE}`, {params: {eventId}})
}

export const updateEventPrize = (data: IFormSubmitCreate) => {
    return axiosInstance.put(`${API_EVENT_Q1_PRIZE}`, data);
}

export const getDetailPrize = (id: number) => {
    return axiosInstance.get(`${API_EVENT_Q1_PRIZE}/${id}`);
}

export const getGiftById = (id: number) => {
    return axiosInstance.get<unknown, IGiftById>(API_GIFT + `/${id}`);
  };


  export const deleteSinglePrize = (id: number) => {
    return axiosInstance.delete(`${API_EVENT_Q1_PRIZE}/${id}`)
  }