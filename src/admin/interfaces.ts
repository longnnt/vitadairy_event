export interface IFormAdmin {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  status: string;
  permission: number;
}

export type IAdminCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export type IAdmins = Array<IFormAdmin>;

export interface IAdminParams {
  endDate?: string;
  page?: number;
  searchText?: string;
  size?: number;
  startDate?: string;
}
export interface IResAdmins {
  data: {
    meta: {
      status: number;
      msg: string;
    };
    response: {
      meta: {
        status: number;
        msg: string;
      };
      pagination: {
        totalPages: number;
        totalRecords: number;
        currentPage: number;
        recordsPerPage: number;
        last: boolean;
      };
      response: IAdmins;
    };
  };
}
export type IPropsAdminTableRow = {
  row: IFormAdmin;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
};
