import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IResEditAdmin } from './interfaces';

type StateProps = {
  filterName: string;
  filterRole: string;
  adminDetail: Partial<IResEditAdmin>;
  confirmPopup:boolean;
  selectedIds:number[];
  isResetSelect:boolean;
};

const initialState: StateProps = {
  filterName: '',
  filterRole: '',
  adminDetail: {},
  confirmPopup: false,
  selectedIds: [],
  isResetSelect:false,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setFilterName: (state, action: PayloadAction<string>) => {
      state.filterName = action.payload;
    },
    setFilterRole: (state, action: PayloadAction<string>) => {
      state.filterRole = action.payload;
    },
    setAdmintDetail: (state, action: PayloadAction<IResEditAdmin>) => {
      state.adminDetail = action.payload;
    },
    setSelectedIds: (state, action: PayloadAction<number[]>) => {
      state.selectedIds = action.payload;
    },
    setConfirmPopup: (state, action: PayloadAction<boolean>) => {
      state.confirmPopup = action.payload;
    },
    setIsResetSelect: (state, action: PayloadAction<boolean>) => {
      state.isResetSelect = action.payload;
    },
  },
});

export const { setFilterName, setFilterRole, setAdmintDetail,setConfirmPopup,setSelectedIds,setIsResetSelect } = adminSlice.actions;

export const filterNameSelector = (state: RootState) => state.admin.filterName;
export const filterRoleSelector = (state: RootState) => state.admin.filterRole;
export const adminDetailSelector = (state: RootState) => state.admin.adminDetail;
export const confirmPopupEventState = (state: RootState) =>
  state.admin.confirmPopup;
export const selectedIdsState = (state: RootState) => state.admin.selectedIds;
export const isResetSelectState = (state: RootState) =>
  state.admin.isResetSelect;

export default adminSlice.reducer;
