import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import {
  IParamsQuery,
  IPayloadDate,
  IPayloadSearch,
  IPayloadStatus,
} from './common/interfaces';

export const initialState: IParamsQuery = {
  searchText: '',
  firstScanStartDate: new Date(2000, 1, 1),
  firstScanEndDate: new Date(2000, 1, 1),
  status: '',
};

export const invitationSlice = createSlice({
  name: 'shop_invitation',
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
    setStatus: (state, action: IPayloadStatus) => {
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
