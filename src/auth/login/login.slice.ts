import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';

type StateProps = {
  email: string;
  showPassword: boolean;
  permission:number
};
const initialState: StateProps = {
  showPassword: false,
  email: '',
  permission:0
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
    setPermission:(state,action)=>{
      state.permission=action.payload
    }
  },
});

export const { setShowPassword, setEmail,setPermission } = loginSlice.actions;

export const showPasswordSelector = (state: RootState) => state.login.showPassword;
export const emailSelector = (state: RootState) => state.login.email;
export const permissionSelector = (state: RootState) => state.login.permission;


export default loginSlice.reducer;
