import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { dispatch } from 'src/common/redux/store';
import { IResEventPrizeById } from '../common/interface';
import { setGiftById, setProvinceInfor } from '../editEventPrize.Slice';
import { getEventPrizeById } from '../service';

export const useGetEventPrizeById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.EVENT_PRIZE_DETAIL, id], () => getEventPrizeById(id), {
      select: (data) => data.data.response,
    }),
  };
};
