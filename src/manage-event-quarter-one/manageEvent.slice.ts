import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IPayloadDate, StateProps } from './common/interface';

export const initialState: StateProps = {
  searchBy: '',
  searchText: '',
  status: '',
  startDate: null,
  endDate: null,
};

export const storeAdminSlice = createSlice({
  name: 'manage-event-quarter-one',
  initialState,
  reducers: {
    setSearchBy: (state, action: PayloadAction<string>) => {
      state.searchBy = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setStartDate: (state, action: IPayloadDate) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: IPayloadDate) => {
      state.endDate = action.payload;
    },
  },
});

export const { setEndDate, setStartDate, setSearchText, setSearchBy, setStatus } =
  storeAdminSlice.actions;

export const setSearchTextSelector = (state: RootState) => state.manageEvent.searchText;
export const setStartDateSelector = (state: RootState) => state.manageEvent.startDate;
export const setEndDateSelector = (state: RootState) => state.manageEvent.endDate;
export const setSearchBySelector = (state: RootState) => state.manageEvent.searchBy;
export const setStatusSelector = (state: RootState) => state.manageEvent.status;

export default storeAdminSlice.reducer;
