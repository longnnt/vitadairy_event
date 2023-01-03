import { useQuery } from "react-query";
import { QUERY_KEYS } from "src/common/constants/queryKeys.constant";
import { IUpdateEventOneCallback } from "../common/interface";
import { getEventOneById } from "../service";

export const useGetEventOneById= ({
    id,
    callback,
  }: {
    id: number;
    callback: IUpdateEventOneCallback;
  }) =>
    useQuery([QUERY_KEYS.EDIT_EVENT_Q1_ADMIN, id], () => getEventOneById(id), {
        select: (data) => data?.data?.response,
      onSuccess() {
        // callback.onSuccess && callback.onSuccess();
      },
      onError() {
        callback.onError && callback.onError();
      },
    });