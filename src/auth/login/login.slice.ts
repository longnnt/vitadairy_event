import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/common/redux/store';

type StateProps = {
  email: string;
  showPassword: boolean;
  permission:number;
  code: string;
};
const initialState: StateProps = {
  showPassword: false,
  email: '',
  permission:0,
  code: '',

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
    },
    setCode: (state, action) => {
      state.code = action.payload;
    },
  },
});

export const { setShowPassword,setCode, setEmail,setPermission } = loginSlice.actions;

export const showPasswordSelector = (state: RootState) => state.login.showPassword;
export const emailSelector = (state: RootState) => state.login.email;
export const permissionSelector = (state: RootState) => state.login.permission;
export const codeSelector = (state: RootState) => state.login.code;


export default loginSlice.reducer;
