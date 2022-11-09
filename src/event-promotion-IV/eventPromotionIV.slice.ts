import { RootState } from 'src/common/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialValueProps, TimeProps, IEventFormData } from './interface';

const initialValue: initialValueProps = {
  startDate: null,
  endDate: null,
  searchText: '',
  isOpenMenu: null,
  eventDetail: {} as IEventFormData,
  userType: 'allUser',
  buttonType: '',
  selectedIds: [],
  isResetSelect: false,
  isOpenModal: false,
  productCode: [] as string[],
};

const eventPromotionIVSlice = createSlice({
  name: 'eventPromotionIV',
  initialState: initialValue,
  reducers: {
    setStartDate: (state, action: PayloadAction<TimeProps>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<TimeProps>) => {
      state.endDate = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    resetFormFilter: (state) => {
      state.startDate = new Date();
      state.endDate = new Date();
      state.searchText = '';
    },
    udpateStatusMenu: (state, action) => {
      state.isOpenMenu = action.payload;
    },
    setEventDetail: (state, action: PayloadAction<IEventFormData>) => {
      state.eventDetail = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setButtonType: (state, action) => {
      state.buttonType = action.payload;
    },
    setSelectedIds: (state, action) => {
      state.selectedIds = action.payload;
    },
    setIsResetSelect: (state, action) => {
      state.isResetSelect = action.payload;
    },
    setIsOpenModal: (state, action) => {
      state.isOpenModal = action.payload;
    },
    setProductCode: (state, action) => {
      state.productCode = action.payload;
    },
  },
});

export default eventPromotionIVSlice.reducer;
export const {
  setStartDate,
  setEndDate,
  setSearchText,
  resetFormFilter,
  udpateStatusMenu,
  setEventDetail,
  setUserType,
  setButtonType,
  setSelectedIds,
  setIsResetSelect,
  setIsOpenModal,
  setProductCode,
} = eventPromotionIVSlice.actions;

export const startDateState = (state: RootState) => state.eventPromotionIV.startDate;
export const endDateState = (state: RootState) => state.eventPromotionIV.endDate;
export const searchTextState = (state: RootState) => state.eventPromotionIV.searchText;
export const openMenuState = (state: RootState) => state.eventPromotionIV.isOpenMenu;
export const eventDetailState = (state: RootState) => state.eventPromotionIV.eventDetail;
export const userTypeState = (state: RootState) => state.eventPromotionIV.userType;
export const buttonTypeState = (state: RootState) => state.eventPromotionIV.buttonType;
export const selectedIdsState = (state: RootState) => state.eventPromotionIV.selectedIds;
export const isResetSelectState = (state: RootState) =>
  state.eventPromotionIV.isResetSelect;
export const openModalState = (state: RootState) => state.eventPromotionIV.isOpenModal;
export const productCodeState = (state: RootState) => state.eventPromotionIV.productCode;
