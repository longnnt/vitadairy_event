import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IParams_Query } from './interfaces';

export const initialState: IParams_Query = {
  searchText: '',
  firstScanStartDate: new Date(2000, 1, 1),
  firstScanEndDate: new Date(2000, 1, 1),
  status: '',
};

export const invitationSlice = createSlice({
  name: 'shop_invitation',
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setFirstScanStartDate: (state, action) => {
      state.firstScanStartDate = action.payload;
    },
    setFirstScanEndDate: (state, action) => {
      state.firstScanEndDate = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setFirstScanEndDate, setFirstScanStartDate, setStatus, setSearchText } =
  invitationSlice.actions;

export const searchTextSelector = (state: RootState) => state.shop_invitation.searchText;
export const statusSelector = (state: RootState) => state.shop_invitation.status;
export const firstScanStartSelector = (state: RootState) =>
  state.shop_invitation.firstScanStartDate;
export const firstScanEndSelector = (state: RootState) =>
  state.shop_invitation.firstScanEndDate;

export default invitationSlice.reducer;
