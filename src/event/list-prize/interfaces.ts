
export interface IListPrizeEventParams {
  endDate?: Date | string;
  page?: number;
  searchText?: string;
  size?: number;
  startDate?: Date | string;
}


export interface IListPrize {
  code: string;
  name: string;
  phoneNumber: number;
  address: string;
  qrLink: string;
  isActive: boolean;
  createdDate: string;
}

export interface IListPrizeActive {
  code: string;
  isActive: boolean;
}

export type IStoreAdminCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export type IListPrizeHistory = Array<IListPrize>;

export interface IListPrizeParams {
  endDate?: Date | string;
  page?: number;
  searchText?: string;
  size?: number;
  startDate?: Date | string;
}

export interface IDataListPrize {
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
      response: IListPrizeHistory;
    };
  }
}

export type IPropsListPrizeTableRow = {
  row: IListPrize;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
};

