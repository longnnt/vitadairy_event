import { API_EVENT_GROUP_ADMIN, API_EVENT_Q1_ADMIN } from "src/common/constants/apis";
import { axiosInstanceTemp } from "src/common/utils/axios";
import { IEventGroup, IFormEditManageEvent, IManageEventParams } from "./common/interface";

export const getEventOneById = (id: number) => {
    return axiosInstanceTemp.get<unknown, any> (`${API_EVENT_Q1_ADMIN}/${id}`);
  };

  export const getEventGroup = () => {
    return axiosInstanceTemp.get<unknown, any>(API_EVENT_GROUP_ADMIN);
  };
  export const editEventOne = async ({
    formEditData,
  }: {
    formEditData: IFormEditManageEvent;
  }) => {
    const data = await axiosInstanceTemp.put(`${API_EVENT_Q1_ADMIN}`, formEditData);
    return data;
  };
  