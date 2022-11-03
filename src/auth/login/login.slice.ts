import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';

type StateProps = {
  email: string;
  showPassword: boolean;
};
const initialState: StateProps = {
  showPassword: false,
  email: '',
};
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setShowPassword, setEmail } = loginSlice.actions;

export const showPasswordSelector = (state: RootState) => state.login.showPassword;
export const emailSelector = (state: RootState) => state.login.email;

export default loginSlice.reducer;
