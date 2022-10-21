import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';
import { IResEditAdmin } from './interfaces';

type StateProps = {
  filterName: string;
  filterRole: string;
  adminDetail: IResEditAdmin;
};

const initialState: StateProps = {
  filterName: '',
  filterRole: '',
  adminDetail: {} as IResEditAdmin,
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
    setAdmintDetail: (state, action: { payload: IResEditAdmin; type: string }) => {
      state.adminDetail = action.payload;
    },
  },
});

export const { setFilterName, setFilterRole, setAdmintDetail } = adminSlice.actions;

export const filterNameSelector = (state: RootState) => state.admin.filterName;
export const filterRoleSelector = (state: RootState) => state.admin.filterRole;
export const adminDetailSelector = (state: RootState) => state.admin.adminDetail;

export default adminSlice.reducer;