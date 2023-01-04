import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { ITableGroupEventPayload, ITablePayload } from './interfaces';

type StateProps = {
  filterName: string;
  itemRows:{
    itemRowId:number;
    alertStatus: boolean;
  }
  selectedIds: number[];
  isResetSelect: boolean;
  isConfirmDelete: boolean;
};

const initialState: StateProps = {
  filterName: '',
  itemRows: {
    itemRowId: 0,
    alertStatus: false,
  },
  selectedIds: [],
  isResetSelect:false,
  isConfirmDelete: false,
};

export const groupEventSlice = createSlice({
  name: 'groupEvent',
  initialState,
  reducers: {
    setFilterName: (state, action: PayloadAction<string>) => {
      state.filterName = action.payload;
    },
    setAlert: (state, action:PayloadAction<ITableGroupEventPayload>) =>{
      state.itemRows.alertStatus = action.payload.alert as boolean;
      state.itemRows.itemRowId= action.payload.itemRowId as number; 
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
  },
})

export const { 
  setFilterName,
  setSelectedIds,
  setAlert,
  setIsResetSelect,
  setIsConfirmDelete,



} = groupEventSlice.actions;


export const filterNameGroupEventSelector = (state: RootState) => state.groupEvent.filterName;
export const alertStatusGroupEventSelector = (state: RootState) => state.groupEvent.itemRows.alertStatus;
export const itemIdGroupEventSelector = (state: RootState) => state.groupEvent.itemRows.itemRowId;
export const itemRowsGroupEventSelector = (state: RootState) => state.groupEvent.itemRows;
export const selectedIdsGroupEventState = (state: RootState) => state.groupEvent.selectedIds;
export const isResetSelectGroupEventSelector = (state: RootState) => state.groupEvent.isResetSelect;
export const isConfirmDeleteGroupEventSelector = (state: RootState) => state.groupEvent.isConfirmDelete;



export default groupEventSlice.reducer;
