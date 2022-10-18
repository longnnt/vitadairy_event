import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';

type StateProps = {
  filterName: string;
  filterRole: string;
};

const initialState: StateProps = {
  filterName: '',
  filterRole: '',
};

export const storeAdminSlice = createSlice({
  name: 'store-admin',
  initialState,
  reducers: {
    setFilterName: (state, action) => {
      state.filterName = action.payload;
    },
    setFilterRole: (state, action) => {
      state.filterRole = action.payload;
    },
  },
});

export const { setFilterName, setFilterRole } = storeAdminSlice.actions;

export const filterNameSelector = (state: RootState) => state.storeAdmin.filterName;
export const filterRoleSelector = (state: RootState) => state.storeAdmin.filterRole;

export default storeAdminSlice.reducer;
