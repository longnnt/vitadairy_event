import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';

type StateProps = {
  showPassword: boolean;
};
const initialState: StateProps = {
  showPassword: false,
};
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
  },
});

export const { setShowPassword } = loginSlice.actions;

export const showPasswordSelector = (state: RootState) => state.login.showPassword;

export default loginSlice.reducer;
