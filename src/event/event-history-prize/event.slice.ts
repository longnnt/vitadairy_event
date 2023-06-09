import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { ButtonType, DEDAULT_PROVINCE, POPUP_TYPE } from './constants';
import {
  IEventDetail,
  IFormCreateEvent,
  IFormSubmitCreate,
  IGift,
  IPayloadDate,
  IPayloadSearch,
  ITransactionType,
} from './interfaces';

type StateProps = {
  searchText: string;
  startDate: Date | null;
  endDate: Date | null;
  gift: IGift;
  buttonType: ButtonType;
  popUpType: string;
  popUpCode: string;
  open: boolean;
  fileCSV: Array<unknown>;
  provinceNewForm: IFormCreateEvent;
  provinceInFo: IFormCreateEvent;
  showData: boolean;
  valueChoice: string;
  transactionType: ITransactionType;
  openModal: boolean;
  editData: IFormSubmitCreate;
  confirmEdit: boolean;
  openEditModal: boolean;
  filterGift: string;
};

export const initialState: StateProps = {
  searchText: '',
  startDate: null,
  endDate: null,
  gift: {} as IGift,
  buttonType: ButtonType.SAVE_SUBMIT,
  popUpType: '',
  popUpCode: '',
  open: false,
  fileCSV: [],
  provinceNewForm: {},
  provinceInFo: {},
  showData: false,
  valueChoice: '',
  transactionType: {} as ITransactionType,
  openModal: false,
  editData: {} as IFormSubmitCreate,
  confirmEdit: false,
  openEditModal: false,
  filterGift: '',
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
    setButtonType: (state, action: PayloadAction<ButtonType>) => {
      state.buttonType = action.payload;
    },
    setPopUpType: (state, action: PayloadAction<string>) => {
      state.popUpType = action.payload;
    },
    setPopUpCode: (state, action: PayloadAction<string>) => {
      state.popUpCode = action.payload;
    },
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setFileCSV: (state, action: PayloadAction<Array<unknown>>) => {
      state.fileCSV = action.payload;
    },
    setProvinceNewForm: (state, action: PayloadAction<IFormCreateEvent>) => {
      state.provinceNewForm = action.payload;
    },
    setProvinceInFo: (state, action: PayloadAction<IFormCreateEvent>) => {
      state.provinceInFo = action.payload;
    },
    setShowData: (state, action: PayloadAction<boolean>) => {
      state.showData = action.payload;
    },
    setValueChoice: (state, action: PayloadAction<string>) => {
      state.valueChoice = action.payload;
    },
    setTransactionType: (state, action: PayloadAction<ITransactionType>) => {
      state.transactionType = action.payload;
    },
    setOpenModal: (state, action: PayloadAction<boolean>) => {
      state.openModal = action.payload;
    },
    setEditData: (state, action: PayloadAction<IFormSubmitCreate>) => {
      state.editData = action.payload;
    },
    setConfirmEdit: (state, action: PayloadAction<boolean>) => {
      state.confirmEdit = action.payload;
    },
    setOpeneditModal: (state, action: PayloadAction<boolean>) => {
      state.openEditModal = action.payload;
    },
    setFilterGift: (state, action: PayloadAction<string>) => {
      state.filterGift = action.payload;
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
  setOpen,
  setFileCSV,
  setProvinceNewForm,
  setProvinceInFo,
  setShowData,
  setValueChoice,
  setTransactionType,
  setOpenModal,
  setConfirmEdit,
  setEditData,
  setOpeneditModal,
  setFilterGift,
} = eventAdminSlice.actions;

export const searchTextSelector = (state: RootState) => state.historyList.searchText;
export const firstScanStartSelector = (state: RootState) => state.historyList.startDate;
export const firstScanEndSelector = (state: RootState) => state.historyList.endDate;
export const giftSelecttor = (state: RootState) => state.historyList.gift;
export const buttonTypeState = (state: RootState) => state.historyList.buttonType;
export const popUpTypeSelector = (state: RootState) => state.historyList.popUpType;
export const popUpCodeSelector = (state: RootState) => state.historyList.popUpCode;
export const setOpenSelector = (state: RootState) => state.historyList.open;
export const setFileCSVSelector = (state: RootState) => state.historyList.fileCSV;
export const setProvinceNewFormSelector = (state: RootState) =>
  state.historyList.provinceNewForm;
export const setProvinceInFoSelector = (state: RootState) =>
  state.historyList.provinceInFo;
export const showDataSelector = (state: RootState) => state.historyList.showData;
export const setValueChoiceSelector = (state: RootState) => state.historyList.valueChoice;
export const setTransactionTypeSelector = (state: RootState) =>
  state.historyList.transactionType;
export const setOpenModalSelector = (state: RootState) => state.historyList.openModal;
export const editDataSelector = (state: RootState) =>
  state.historyList.editData;
export const confirmEditSelector = (state: RootState) => state.historyList.confirmEdit;
export const openEditModalSelector = (state: RootState) =>
  state.historyList.openEditModal;
export const filterGiftSelector = (state: RootState) => state.historyList.filterGift;

export default eventAdminSlice.reducer;
