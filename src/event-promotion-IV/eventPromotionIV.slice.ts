import { RootState } from 'src/common/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialValueProps, TimeProps, IEventFormData } from './interface';

const initialValue: initialValueProps = {
  searchParams: {
    startDate: null,
    endDate: null,
    searchText: '',
  },
  isFilter: false,
  isDeleteSelected: false,
  isOpenMenu: null,
  eventDetail: {} as IEventFormData,
};

const eventPromotionIVSlice = createSlice({
  name: 'eventPromotionIV',
  initialState: initialValue,
  reducers: {
    updateTimeStart: (state, action: PayloadAction<TimeProps>) => {
      state.searchParams.startDate = action.payload;
    },
    updateTimeEnd: (state, action: PayloadAction<TimeProps>) => {
      state.searchParams.endDate = action.payload;
    },
    updateSearchInput: (state, action: PayloadAction<string>) => {
      state.searchParams.searchText = action.payload;
    },
    resetFormFilter: (state) => {
      state.searchParams.startDate = new Date();
      state.searchParams.endDate = new Date();
      state.searchParams.searchText = '';
    },
    udpateStatusMenu: (state, action) => {
      state.isOpenMenu = action.payload;
    },
    setEventDetail: (state, action: PayloadAction<IEventFormData>) => {
      state.eventDetail = action.payload;
    },
  },
});

export default eventPromotionIVSlice.reducer;
export const {
  updateTimeStart,
  updateTimeEnd,
  updateSearchInput,
  resetFormFilter,
  udpateStatusMenu,
  setEventDetail,
} = eventPromotionIVSlice.actions;

export const timeStartState = (state: RootState) =>
  state.eventPromotionIV.searchParams.startDate;
export const timeEndState = (state: RootState) =>
  state.eventPromotionIV.searchParams.endDate;
export const searchInputState = (state: RootState) =>
  state.eventPromotionIV.searchParams.searchText;
export const openMenuState = (state: RootState) => state.eventPromotionIV.isOpenMenu;
export const eventDetailState = (state: RootState) => state.eventPromotionIV.eventDetail;
