import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IPayloadDate, IPayloadSearch, IStoreParams } from './interfaces';

type StateProps = {
  startDate: Date | null;
  searchText: string;
  endDate: Date | null;
  code: string;
  showDataStore: boolean;
};

export const initialState: StateProps = {
  searchText: '',
  startDate: null,
  endDate: null,
  code: '',
  showDataStore: false,
};

export const storeAdminSlice = createSlice({
  name: 'store-admin',
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
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    setShowDataStore: (state, action: PayloadAction<boolean>) => {
      state.showDataStore = action.payload;
    },
  },
});

export const {
  setFirstScanEndDate,
  setFirstScanStartDate,
  setSearchText,
  setCode,
  setShowDataStore,
} = storeAdminSlice.actions;

export const searchTextSelector = (state: RootState) => state.storeAdmin.searchText;
export const firstScanStartSelector = (state: RootState) => state.storeAdmin.startDate;
export const firstScanEndSelector = (state: RootState) => state.storeAdmin.endDate;
export const codeSelector = (state: RootState) => state.storeAdmin.code;
export const showDataStoreSelector = (state: RootState) => state.storeAdmin.showDataStore;

export default storeAdminSlice.reducer;
