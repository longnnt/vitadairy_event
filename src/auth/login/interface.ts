export type IAuth = {
  email: string;
  password: string;
};

export type ILoginCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export type FormValuesProps = {
  email: string;
};

export type IForgotPassword = {
  email: string;
};

export interface IResForgotPass {
  meta: {
    status: number;
    msg: string;
  };
  response: boolean;
}
