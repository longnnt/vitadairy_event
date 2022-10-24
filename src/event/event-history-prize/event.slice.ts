import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';

type StateProps = {
  filterName: string;
  filterRole: string;
  filterFromDate: any,
  filterToDate: any,
};

const initialState: StateProps = {
  filterName: '',
  filterRole: '',
  filterFromDate: null,
  filterToDate: null,
};

export const eventAdminSlice = createSlice({
  name: 'eventAdmin',
  initialState,
  reducers: {
    setFilterName: (state, action: PayloadAction<string>) => {
      state.filterName = action.payload;
    },
    setFilterRole: (state, action: PayloadAction<string>) => {
      state.filterRole = action.payload;
    },
    setFilterFromDate: (state, action: PayloadAction<string>) => {
      state.filterFromDate = action.payload;
    },
    setFilterToDate: (state, action: PayloadAction<string>) => {
      state.filterToDate = action.payload;
    },
  },
});

export const { setFilterName, setFilterRole, setFilterFromDate, setFilterToDate } = eventAdminSlice.actions;

export const filterNameSelector = (state: RootState) => state.historyList.filterName;
export const filterRoleSelector = (state: RootState) => state.historyList.filterRole;
export const filterFromDateSelector = (state: RootState) => state.historyList.filterFromDate;
export const filterToDateSelector = (state: RootState) => state.historyList.filterToDate;


export default eventAdminSlice.reducer;
