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

export const listPrizeEventSlice = createSlice({
  name: 'listPrize',
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

export const { setFilterName,setSelectedIds } = listPrizeEventSlice.actions;
export const { setAlert } = listPrizeEventSlice.actions;
export const { setIsResetSelect } = listPrizeEventSlice.actions;


export const filterNameSelector = (state: RootState) => state.listPrize.filterName;
export const alertStatusSelector = (state: RootState) => state.listPrize.itemRows.alertStatus;
export const itemIdSelector = (state: RootState) => state.listPrize.itemRows.itemRowId;
export const itemRowsSelector = (state: RootState) => state.listPrize.itemRows;
export const selectedIdsState = (state: RootState) => state.listPrize.selectedIds;
export const isResetSelectSelector = (state: RootState) => state.listPrize.isResetSelect;

export default listPrizeEventSlice.reducer;
