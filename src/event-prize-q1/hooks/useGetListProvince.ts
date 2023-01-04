import { useQuery } from "react-query"
import { QUERY_KEYS } from "src/common/constants/queryKeys.constant"
import { IProvinceParams } from "../interface"
import { getProvince } from "../services"

export const useGetListProvince = (params: IProvinceParams) => {
    return {
        ...useQuery([QUERY_KEYS.EVENT_GET_PROVINCE, params], () => getProvince(params)),
    }
}