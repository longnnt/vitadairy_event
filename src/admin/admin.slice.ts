import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';

type StateProps = {
  filterName: string;
  filterRole: string;
};

const initialState: StateProps = {
  filterName: '',
  filterRole: '',
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
  },
});

export const { setFilterName, setFilterRole } = adminSlice.actions;

export const filterNameSelector = (state: RootState) => state.admin.filterName;
export const filterRoleSelector = (state: RootState) => state.admin.filterRole;

export default adminSlice.reducer;
