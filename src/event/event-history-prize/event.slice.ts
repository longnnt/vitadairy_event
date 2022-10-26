import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IPayloadDate, IPayloadSearch } from './interfaces';

type StateProps = {
  searchText: string;
  startDate: Date | string;
  endDate: Date | string;
};

export const initialState: StateProps = {
  searchText: '',
  startDate: new Date("2022-01-01T00:00:00Z"),
  endDate: new Date().toISOString(),
};

export const eventAdminSlice = createSlice({
  name: 'eventAdmin',
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
  eventAdminSlice.actions;

  export const searchTextSelector = (state: RootState) => state.historyList.searchText;
  export const firstScanStartSelector = (state: RootState) => state.historyList.startDate;
  export const firstScanEndSelector = (state: RootState) => state.historyList.endDate;

export default eventAdminSlice.reducer;
