import { PATH_DASHBOARD } from './../../common/routes/paths';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { useMutation, useQueryClient } from "react-query";
import { IStoreAdminCallback } from "../interface";
import { createEventPrize } from "../services";
import useMessage from 'src/common/hooks/useMessage';

export const useAddEventPrize = (callback: IStoreAdminCallback) => {
    const { showErrorSnackbar } = useMessage();
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    return useMutation(createEventPrize, {
        onSuccess: (res) => {
            if(res.data?.meta?.status === 1000) {
                queryClient.invalidateQueries([QUERY_KEYS.EVENT_LIST_PRIZE_Q1]);
                const idEvent = res?.data?.response?.eventId;
                callback.onSuccess && callback.onSuccess()
                navigate(PATH_DASHBOARD.eventPrizeQ1.list);
            } else {
                showErrorSnackbar(res.data?.meta?.msg)
            }
        },
        onError: (error) => {
            callback.onError && callback.onError();
        }
    })
}