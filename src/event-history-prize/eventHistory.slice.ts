import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IPayloadDate, IPayloadSearch, StateProps } from './common/interface';

export const initialState: StateProps = {
  searchText: '',
  startDate: null,
  endDate: null,
};

export const eventHistorySlice = createSlice({
  name: 'eventHistoryPrize',
  initialState,
  reducers: {
    setSearchText: (state, action: IPayloadSearch) => {
      state.searchText = action.payload;
    },
    setFirstScanStartDate: (state, action: IPayloadDate) => {
      state.startDate = action.payload;
    },
    setFirstScanEndDate: (state, action: IPayloadDate) => {
      state.endDate = action.payload;
    },
  },
});

export const { setFirstScanEndDate, setFirstScanStartDate, setSearchText } =
  eventHistorySlice.actions;

export const searchTextSelector = (state: RootState) =>
  state.eventHistoryPrize.searchText;
export const firstScanStartSelector = (state: RootState) =>
  state.eventHistoryPrize.startDate;
export const firstScanEndSelector = (state: RootState) => state.eventHistoryPrize.endDate;

export default eventHistorySlice.reducer;
