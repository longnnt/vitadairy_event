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
}

const initialState: stateType = {
  dataGiftById: DEFAULT_FORM_VALUE,
  provinceInfor: [DEDAULT_PROVINCE],
  provinceForm: [],
  choosenGiftPoint: GIFT_POINT.GIFT,
  popUpType: '',
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
  },
});

export const {
  setGiftById,
  setProvinceInfor,
  setProvinceForm,
  setChoosenGiftPoint,
  setPopUpType,
} = editEventPrizeSlice.actions;

export const giftByIdSelector = (state: RootState) => state.edit_event_prize.dataGiftById;
export const provinceInforSelector = (state: RootState) =>
  state.edit_event_prize.provinceInfor;
export const provinceFormSelector = (state: RootState) =>
  state.edit_event_prize.provinceForm;
export const choosenGiftPointSelector = (state: RootState) =>
  state.edit_event_prize.choosenGiftPoint;
export const popUpTypeSelector = (state: RootState) => state.edit_event_prize.popUpType;

export default editEventPrizeSlice.reducer;
