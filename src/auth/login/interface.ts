import { IFormAdmin } from "src/admin/interfaces";

export type IAuth = {
  email: string;
  password: string;
};

export type ILoginCallback = {
  onError: VoidFunction;
};

export type FormValuesProps = {
  email: string;
};

export type IForgotPassword = {
  email: string;
};

export type IResetPassword = {
  password: string;
};
export interface IParamResetPassWord{
  password: string;

  token:string | null;

}

export interface IResForgotPass {
  meta: {
    status: number;
    msg: string;
  };
  response: boolean;
}
export interface IResResetPass {
  meta: {
    status: number;
    msg: string;
  };
  response: IFormAdmin;
}