import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { useMutation, useQueryClient } from "react-query";
import { IStoreAdminCallback } from "../interface";
import { updateEventPrize } from "../services";
import useMessage from 'src/common/hooks/useMessage';

export const useUpdateEventPrize = (callback: IStoreAdminCallback) => {
    const { showErrorSnackbar } = useMessage();
    const queryClient = useQueryClient();
    return useMutation(updateEventPrize, {
        onSuccess: (res) => {
            if(res.data?.meta?.status === 1000) {
                queryClient.invalidateQueries([QUERY_KEYS.EVENT_LIST_PRIZE_Q1]);
                callback.onSuccess && callback.onSuccess()
            } else {
                showErrorSnackbar(res.data?.meta?.msg)
            }
        },
        onError: (error) => {
            console.log(error)
            callback.onError && callback.onError();
        }
    })
}