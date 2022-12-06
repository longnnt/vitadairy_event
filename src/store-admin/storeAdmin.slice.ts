import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IPayloadDate, IPayloadSearch, IStoreParams } from './interfaces';

type StateProps = {
  startDate: Date | null;
  searchText: string;
  endDate: Date | null;
  showDataStore: boolean;
};

export const initialState: StateProps = {
  searchText: '',
  startDate: null,
  endDate: null,
  showDataStore: false,
};

export const storeAdminSlice = createSlice({
  name: 'store-admin',
  initialState,
  reducers: {
    setSearchText: (state, action: IPayloadSearch) => {
      state.searchText = action.payload;
    },
    setStartDate: (state, action: IPayloadDate) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: IPayloadDate) => {
      state.endDate = action.payload;
    },
   
    setShowDataStore: (state, action: PayloadAction<boolean>) => {
      state.showDataStore = action.payload;
    },
  },
});

export const {
  setEndDate,
  setStartDate,
  setSearchText,
  setShowDataStore,
} = storeAdminSlice.actions;

export const searchTextSelector = (state: RootState) => state.storeAdmin.searchText;
export const startDateSelector = (state: RootState) => state.storeAdmin.startDate;
export const endDateSelector = (state: RootState) => state.storeAdmin.endDate;
export const showDataStoreSelector = (state: RootState) => state.storeAdmin.showDataStore;
export default storeAdminSlice.reducer;
