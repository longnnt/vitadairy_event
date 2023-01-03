import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "src/common/constants/queryKeys.constant";
import { IUpdateEventOneCallback } from "../common/interface";
import { editEventOne } from "../service";

export const useEditEventOne = (callback: IUpdateEventOneCallback) => {
    const queryClient = useQueryClient();
    return {
      ...useMutation(editEventOne, {
        onSuccess: (_result, variables) => {
        //   queryClient.invalidateQueries([QUERY_KEYS.EVENT_DETAIL]);
  
        //   callback.onSuccess && callback.onSuccess();
        },
        onError: () => {
          callback.onError && callback.onError();
        },
      }),
    };
  };