import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { DEFAULT_FORM_VALUE_SUBMIT, GIFT_POINT } from './common/constants';
import { IEventDetailProvinces, IFormSubmitEdit } from './common/interface';

interface stateType {
  dataGiftById: IFormSubmitEdit;
  provinceInfor: IEventDetailProvinces;
  provinceForm: IEventDetailProvinces;
  choosenGiftPoint: string;
  popUpType: string;
  openEditModal: boolean;
  confirmEdit: boolean;
  editData: IFormSubmitEdit;
  rows: IEventDetailProvinces;
  leftGift: number;
}

const initialState: stateType = {
  dataGiftById: DEFAULT_FORM_VALUE_SUBMIT,
  provinceInfor: {},
  provinceForm: {},
  choosenGiftPoint: GIFT_POINT.GIFT,
  popUpType: '',
  openEditModal: false,
  confirmEdit: false,
  editData: {} as IFormSubmitEdit,
  rows: {},
  leftGift: 0,
};

export const editEventPrizeSlice = createSlice({
  name: 'edit_event_prize',
  initialState,
  reducers: {
    setGiftById: (state, action: PayloadAction<IFormSubmitEdit>) => {
      state.dataGiftById = action.payload;
    },
    setProvinceInfor: (state, action: PayloadAction<IEventDetailProvinces>) => {
      state.provinceInfor = action.payload;
    },
    setProvinceForm: (state, action: PayloadAction<IEventDetailProvinces>) => {
      state.provinceForm = action.payload;
    },
    setChoosenGiftPoint: (state, action: PayloadAction<string>) => {
      state.choosenGiftPoint = action.payload;
    },
    setPopUpType: (state, action: PayloadAction<string>) => {
      state.popUpType = action.payload;
    },
    setOpeneditModal: (state, action: PayloadAction<boolean>) => {
      state.openEditModal = action.payload;
    },
    setConfirmEdit: (state, action: PayloadAction<boolean>) => {
      state.confirmEdit = action.payload;
    },
    setEditData: (state, action: PayloadAction<IFormSubmitEdit>) => {
      state.editData = action.payload;
    },
    setRows: (state, action: PayloadAction<IEventDetailProvinces>) => {
      state.rows = action.payload;
    },
    setLeftGift: (state, action: PayloadAction<number>) => {
      state.leftGift = action.payload;
    },
  },
});

export const {
  setGiftById,
  setProvinceInfor,
  setProvinceForm,
  setChoosenGiftPoint,
  setPopUpType,
  setOpeneditModal,
  setConfirmEdit,
  setEditData,
  setRows,
  setLeftGift,
} = editEventPrizeSlice.actions;

export const giftByIdSelector = (state: RootState) => state.edit_event_prize.dataGiftById;
export const provinceInforSelector = (state: RootState) =>
  state.edit_event_prize.provinceInfor;
export const provinceFormSelector = (state: RootState) =>
  state.edit_event_prize.provinceForm;
export const choosenGiftPointSelector = (state: RootState) =>
  state.edit_event_prize.choosenGiftPoint;
export const popUpTypeSelector = (state: RootState) => state.edit_event_prize.popUpType;
export const openEditModalSelector = (state: RootState) =>
  state.edit_event_prize.openEditModal;
export const confirmEditSelector = (state: RootState) =>
  state.edit_event_prize.confirmEdit;
export const editDataSelector = (state: RootState) => state.edit_event_prize.editData;

export const rowsSelector = (state: RootState) => state.edit_event_prize.rows;
export const leftGiftSelector = (state: RootState) => state.edit_event_prize.leftGift;

export default editEventPrizeSlice.reducer;
