import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { ITableGroupEventPayload, ITablePayload } from './interfaces';

type StateProps = {
  filterName: string;
  alertStatus: boolean;
  selectedIds: number[];
  isResetSelect: boolean;
  isConfirmDelete: boolean;
  rowID: number;
};

const initialState: StateProps = {
  filterName: '',
  
  alertStatus: false,
  
  selectedIds: [],
  isResetSelect:false,
  isConfirmDelete: false,
  rowID: 0,
};

export const groupEventSlice = createSlice({
  name: 'groupEvent',
  initialState,
  reducers: {
    setFilterName: (state, action: PayloadAction<string>) => {
      state.filterName = action.payload;
    },
    setAlert: (state, action:PayloadAction<boolean>) =>{
      state.alertStatus =action.payload; 
    },
    setSelectedIds: (state, action: PayloadAction<number[]>) => {
      state.selectedIds = action.payload;
    },
    setIsResetSelect:(state, action:PayloadAction<boolean>) =>{
      state.isResetSelect = action.payload;
    },
    setIsConfirmDelete:(state, action:PayloadAction<boolean>) =>{
      state.isConfirmDelete = action.payload;
    },
    setRowID: (state, action: PayloadAction<number>) =>{
      state.rowID = action.payload;
    }
  },
})

export const { 
  setFilterName,
  setSelectedIds,
  setAlert,
  setIsResetSelect,
  setIsConfirmDelete,
  setRowID,



} = groupEventSlice.actions;


export const filterNameGroupEventSelector = (state: RootState) => state.groupEvent.filterName;
export const alertStatusGroupEventSelector = (state: RootState) => state.groupEvent.alertStatus;
export const selectedIdsGroupEventState = (state: RootState) => state.groupEvent.selectedIds;
export const isResetSelectGroupEventSelector = (state: RootState) => state.groupEvent.isResetSelect;
export const isConfirmDeleteGroupEventSelector = (state: RootState) => state.groupEvent.isConfirmDelete;
export const rowIdGroupEventSelector = (state: RootState) => state.groupEvent.rowID;




export default groupEventSlice.reducer;
