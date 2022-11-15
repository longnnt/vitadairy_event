import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { DEDAULT_PROVINCE, DEFAULT_FORM_VALUE, GIFT_POINT } from './common/constants';
import { IEventProvince, IFormEdit } from './common/interface';

interface stateType {
  dataGiftById: IFormEdit;
  provinceInfor: IEventProvince[];
  provinceForm: IEventProvince[];
  choosenGiftPoint: string;
  popUpType: string;
  openEditModal: boolean;
  confirmEdit: boolean;
  editData: IFormEdit;
}

const initialState: stateType = {
  dataGiftById: DEFAULT_FORM_VALUE,
  provinceInfor: [DEDAULT_PROVINCE],
  provinceForm: [],
  choosenGiftPoint: GIFT_POINT.GIFT,
  popUpType: '',
  openEditModal: false,
  confirmEdit: false,
  editData: {} as IFormEdit,
};

export const editEventPrizeSlice = createSlice({
  name: 'edit_event_prize',
  initialState,
  reducers: {
    setGiftById: (state, action: PayloadAction<IFormEdit>) => {
      state.dataGiftById = action.payload;
    },
    setProvinceInfor: (state, action: PayloadAction<Array<IEventProvince>>) => {
      state.provinceInfor = action.payload;
    },
    setProvinceForm: (state, action: PayloadAction<Array<IEventProvince>>) => {
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
    setEditData: (state, action: PayloadAction<IFormEdit>) => {
      state.editData = action.payload;
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

export default editEventPrizeSlice.reducer;
