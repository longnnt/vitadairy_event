import { API_EVENT_GROUP_ADMIN, API_EVENT_Q1_ADMIN } from "src/common/constants/apis";
import { axiosInstance } from "src/common/utils/axios";
import { IQuery } from "src/event/edit-event-prize/common/interface";
import { IEventGroup,  IFormEditManageEvents, IManageEventParams, IResEditManageEvent } from "./common/interface";

export const getEventOneById = (id: number) => {
    return axiosInstance.get (`${API_EVENT_Q1_ADMIN}/${id}`);
  };

  export const getEventGroup = (params: IEventGroup) => {
    return axiosInstance.get<unknown, any>(API_EVENT_GROUP_ADMIN,{
      params,
    });
  };
  export const editEventOne = async ({
    formEditData,
  }: {
    formEditData: IFormEditManageEvents;
  }) => {
    const data = await axiosInstance.put(`${API_EVENT_Q1_ADMIN}`, formEditData);
    return data;
  };