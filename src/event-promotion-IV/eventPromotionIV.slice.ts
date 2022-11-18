import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IEventFormData, initialValueProps, TimeProps, UserType } from './interface';

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
  product: [] as string[],
  confirmPopup: false,


  openEditModal: false,
  confirmEdit: false,
  filterProductCode: '',
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

    setEventDetail: (state, action: PayloadAction<IEventFormData>) => {
      state.eventDetail = action.payload;
    },
    setUserType: (state, action: PayloadAction<UserType>) => {
      state.userType = action.payload;
    },
    setButtonType: (state, action: PayloadAction<string>) => {
      state.buttonType = action.payload;
    },
    setSelectedIds: (state, action: PayloadAction<number[]>) => {
      state.selectedIds = action.payload;
    },
    setIsResetSelect: (state, action: PayloadAction<boolean>) => {
      state.isResetSelect = action.payload;
    },
    setIsOpenModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload;
    },
    setProduct: (state, action: PayloadAction<string[]>) => {
      state.product = action.payload;
    },
    setConfirmPopup: (state, action: PayloadAction<boolean>) => {
      state.confirmPopup = action.payload;
    },

    setOpeneditModal: (state, action: PayloadAction<boolean>) => {
      state.openEditModal = action.payload;
    },
    setConfirmEdit: (state, action: PayloadAction<boolean>) => {
      state.confirmEdit = action.payload;
    setSearchProductCode: (state, action: PayloadAction<string>) => {
      state.filterProductCode = action.payload;
    },
  },
});

export default eventPromotionIVSlice.reducer;
export const {
  setStartDate,
  setEndDate,
  setSearchText,
  resetFormFilter,
  setEventDetail,
  setUserType,
  setButtonType,
  setSelectedIds,
  setIsResetSelect,
  setIsOpenModal,
  setProduct,
  setConfirmPopup,
  setOpeneditModal,
  setConfirmEdit,
  setSearchProductCode,
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
export const productState = (state: RootState) => state.eventPromotionIV.product;
export const confirmPopupEventState = (state: RootState) =>
  state.eventPromotionIV.confirmPopup;

  export const openEditModalSelector = (state: RootState) =>
  state.eventPromotionIV.openEditModal;
export const confirmEditSelector = (state: RootState) =>
  state.eventPromotionIV.confirmEdit;
export const filterProductCodeState = (state: RootState) =>
  state.eventPromotionIV.filterProductCode;
