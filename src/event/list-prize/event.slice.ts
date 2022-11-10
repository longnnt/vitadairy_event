import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';

type StateProps = {
  filterName: string;
  alertStatus: boolean;
};

const initialState: StateProps = {
  filterName: '',
  alertStatus: false,
};

export const listPrizeEventSlice = createSlice({
  name: 'eventAdmin',
  initialState,
  reducers: {
    setFilterName: (state, action: PayloadAction<string>) => {
      state.filterName = action.payload;
    },
    setAlertStatus: (state, action:PayloadAction<boolean>) =>{
      state.alertStatus = action.payload;
    },
  },
});

export const { setFilterName } = listPrizeEventSlice.actions;
export const { setAlertStatus } = listPrizeEventSlice.actions;

export const filterNameSelector = (state: RootState) => state.listPrize.filterName;
export const alertStatusSelector = (state: RootState) => state.listPrize.alertStatus;

export default listPrizeEventSlice.reducer;
