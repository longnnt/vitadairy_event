import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IGift, IPayloadDate, IPayloadSearch } from './interfaces';

type StateProps = {
  searchText: string;
  startDate: Date | null;
  endDate: Date | null;
  gift: IGift;
  buttonType: string;
  popUpType: string;
  popUpCode: string | null;
};

export const initialState: StateProps = {
  searchText: '',
  startDate: null,
  endDate: null,
  gift: {} as IGift,
  buttonType: '',
  popUpType: '',
  popUpCode: '',
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
    setGift: (state, action: PayloadAction<IGift>) => {
      state.gift = action.payload;
    },
    setButtonType: (state, action) => {
      state.buttonType = action.payload;
    },
    setPopUpType: (state, action) => {
      state.popUpType = action.payload;
    },
    setPopUpCode: (state, action) => {
      state.popUpCode = action.payload;
    },
  },
});

export const {
  setFirstScanEndDate,
  setFirstScanStartDate,
  setSearchText,
  setGift,
  setButtonType,
  setPopUpType,
  setPopUpCode,
} = eventAdminSlice.actions;

export const searchTextSelector = (state: RootState) => state.historyList.searchText;
export const firstScanStartSelector = (state: RootState) => state.historyList.startDate;
export const firstScanEndSelector = (state: RootState) => state.historyList.endDate;
export const giftSelecttor = (state: RootState) => state.historyList.gift;
export const buttonTypeState = (state: RootState) => state.historyList.buttonType;
export const popUpTypeState = (state: RootState) => state.historyList.popUpType;
export const popUpCodeState = (state: RootState) => state.historyList.popUpCode;

export default eventAdminSlice.reducer;
