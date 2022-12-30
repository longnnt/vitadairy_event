import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { ITablePayload } from './interfaces';

type StateProps = {
  filterName: string;
  itemRows:{
    itemRowId:string[];
    alertStatus: boolean;
  }
  selectedIds: number[];
  isResetSelect: boolean;
};

const initialState: StateProps = {
  filterName: '',
  itemRows: {
    itemRowId: [],
    alertStatus: false,
  },
  selectedIds: [],
  isResetSelect:false,
};

export const groupEventSlice = createSlice({
  name: 'groupEvent',
  initialState,
  reducers: {
    setFilterName: (state, action: PayloadAction<string>) => {
      state.filterName = action.payload;
    },
    setAlert: (state, action:PayloadAction<ITablePayload>) =>{
      state.itemRows.alertStatus = action.payload.alertStatus as boolean;
      state.itemRows.itemRowId= action.payload.itemId as string[]; 
    },
    setSelectedIds: (state, action: PayloadAction<number[]>) => {
      state.selectedIds = action.payload;
    },
    setIsResetSelect:(state, action:PayloadAction<boolean>) =>{
      state.isResetSelect = action.payload;
    }
  },
})

export const { setFilterName,setSelectedIds } = groupEventSlice.actions;
export const { setAlert } = groupEventSlice.actions;
export const { setIsResetSelect } = groupEventSlice.actions;


export const filterNameGroupEventSelector = (state: RootState) => state.groupEvent.filterName;
export const alertStatusGroupEventSelector = (state: RootState) => state.groupEvent.itemRows.alertStatus;
export const itemIdGroupEventSelector = (state: RootState) => state.groupEvent.itemRows.itemRowId;
export const itemRowsGroupEventSelector = (state: RootState) => state.groupEvent.itemRows;
export const selectedIdsGroupEventState = (state: RootState) => state.groupEvent.selectedIds;
export const isResetSelectGroupEventSelector = (state: RootState) => state.groupEvent.isResetSelect;

export default groupEventSlice.reducer;
