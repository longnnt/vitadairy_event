import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IPayloadDate, StateProps } from './common/interface';

export const initialState: StateProps = {
  searchBy: '',
  searchText: '',
  status: '',
  startDate: null,
  endDate: null,
  selectedIds: [],
  openEditModal: false,
  confirmEdit: false,
  isResetSelect: false,
};

export const manageEventSlice = createSlice({
  name: 'manage-event-quarter-one',
  initialState,
  reducers: {
    setSearchBy: (state, action: PayloadAction<string>) => {
      state.searchBy = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setStartDate: (state, action: IPayloadDate) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: IPayloadDate) => {
      state.endDate = action.payload;
    },
    setSelectedIds: (state, action: PayloadAction<number[]>) => {
      state.selectedIds = action.payload;
    },
    setIsResetSelect: (state, action: PayloadAction<boolean>) => {
      state.isResetSelect = action.payload;
    },
    setOpeneditModal: (state, action: PayloadAction<boolean>) => {
      state.openEditModal = action.payload;
    },
    setConfirmEdit: (state, action: PayloadAction<boolean>) => {
      state.confirmEdit = action.payload;
    },
  },
});

export const {
  setEndDate,
  setStartDate,
  setSearchText,
  setSearchBy,
  setStatus,
  setSelectedIds,
  setIsResetSelect,
  setOpeneditModal,
  setConfirmEdit,
} = manageEventSlice.actions;

export const setSearchTextSelector = (state: RootState) => state.manageEvent.searchText;
export const setStartDateSelector = (state: RootState) => state.manageEvent.startDate;
export const setEndDateSelector = (state: RootState) => state.manageEvent.endDate;
export const setSearchBySelector = (state: RootState) => state.manageEvent.searchBy;
export const setStatusSelector = (state: RootState) => state.manageEvent.status;
export const selectedIdsState = (state: RootState) => state.manageEvent.selectedIds;
export const isResetSelectState = (state: RootState) => state.manageEvent.isResetSelect;
export const openEditModalSelector = (state: RootState) =>
  state.manageEvent.openEditModal;
export const confirmEditSelector = (state: RootState) =>
  state.manageEvent.confirmEdit;

export default manageEventSlice.reducer;
