import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import {
  IParamsQuery,
  IPayloadDate,
  IPayloadSearch,
  IPayloadStatus,
} from './common/interfaces';

type StateProps = {
  firstScanStartDate: Date | null;
  searchText: string;
  firstScanEndDate: Date | null;
  status: string | boolean;
};

export const initialState: StateProps = {
  searchText: '',
  firstScanStartDate: null,
  firstScanEndDate: null,
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
    setStatus: (state, action: PayloadAction<boolean>) => {
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
