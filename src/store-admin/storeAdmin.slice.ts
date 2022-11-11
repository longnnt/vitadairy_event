import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IPayloadDate, IPayloadSearch, IStoreParams } from './interfaces';

export const initialState: IStoreParams = {
  searchText: '',
  firstScanStartDate: null,
  firstScanEndDate: null,
};

export const storeAdminSlice = createSlice({
  name: 'store-admin',
  initialState,
  reducers: {
    setSearchText: (state, action: IPayloadSearch) => {
      state.searchText = action.payload;
    },
    setFirstScanStartDate: (state, action: IPayloadDate) => {
      state.firstScanStartDate = action.payload;
    },
    setFirstScanEndDate: (state, action: IPayloadDate) => {
      state.firstScanEndDate = action.payload;
    },
  },
});

export const { setFirstScanEndDate, setFirstScanStartDate, setSearchText } =
  storeAdminSlice.actions;

export const searchTextSelector = (state: RootState) => state.storeAdmin.searchText;
export const firstScanStartSelector = (state: RootState) =>
  state.storeAdmin.firstScanStartDate;
export const firstScanEndSelector = (state: RootState) =>
  state.storeAdmin.firstScanEndDate;

export default storeAdminSlice.reducer;
