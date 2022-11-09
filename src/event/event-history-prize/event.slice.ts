import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { ButtonType, DEDAULT_PROVINCE } from './constants';
import { IEventDetail, IGift, IPayloadDate, IPayloadSearch } from './interfaces';

type StateProps = {
  searchText: string;
  startDate: Date | null;
  endDate: Date | null;
  gift: IGift;
  buttonType: ButtonType;
  popUpType: string;
  popUpCode: string | null;
  open: boolean;
  dataCities: IEventDetail[];
  fileCSV: Array<unknown>;
  provinceNewForm: IEventDetail[];
  provinceInFo: IEventDetail[];
  showData: boolean;
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
  dataCities: [],
  fileCSV: [],
  provinceNewForm: [],
  provinceInFo: [DEDAULT_PROVINCE],
  showData: false,
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
    setDataCities: (state, action: PayloadAction<IEventDetail[]>) => {
      state.dataCities = action.payload;
    },
    setFileCSV: (state, action: PayloadAction<Array<unknown>>) => {
      state.fileCSV = action.payload;
    },
    setProvinceNewForm: (state, action: PayloadAction<Array<IEventDetail>>) => {
      state.provinceNewForm = action.payload;
    },
    setProvinceInFo: (state, action: PayloadAction<Array<IEventDetail>>) => {
      state.provinceInFo = action.payload;
    },
    setShowData: (state, action: PayloadAction<boolean>) => {
      state.showData = action.payload;
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
  setDataCities,
  setFileCSV,
  setProvinceNewForm,
  setProvinceInFo,
  setShowData,
} = eventAdminSlice.actions;

export const searchTextSelector = (state: RootState) => state.historyList.searchText;
export const firstScanStartSelector = (state: RootState) => state.historyList.startDate;
export const firstScanEndSelector = (state: RootState) => state.historyList.endDate;
export const giftSelecttor = (state: RootState) => state.historyList.gift;
export const buttonTypeState = (state: RootState) => state.historyList.buttonType;
export const popUpTypeSelector = (state: RootState) => state.historyList.popUpType;
export const popUpCodeSelector = (state: RootState) => state.historyList.popUpCode;
export const setOpenSelector = (state: RootState) => state.historyList.open;
export const setDataCitiesSelector = (state: RootState) => state.historyList.dataCities;
export const setFileCSVSelector = (state: RootState) => state.historyList.fileCSV;
export const setProvinceNewFormSelector = (state: RootState) =>
  state.historyList.provinceNewForm;
export const setProvinceInFoSelector = (state: RootState) =>
  state.historyList.provinceInFo;
export const showDataSelector = (state: RootState) => state.historyList.showData;

export default eventAdminSlice.reducer;
