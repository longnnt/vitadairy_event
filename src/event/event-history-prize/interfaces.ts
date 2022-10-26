export interface IHistoryListEventParams {
  endDate?: Date | string;
  page?: number;
  searchText?: string;
  size?: number;
  startDate?: Date | string;
}

export interface IPrizeHistory {
  id: string;
  userName: string;
  phoneNumber: number;
  giftName: string;
  qr: string;
  giftReceivedDate: string;
  spoonCode: string;
}

export interface IPrizeHistoryActive {
  code: string;
  isActive: boolean;
}

export type IStoreAdminCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export type IListPrizeHistory = Array<IPrizeHistory>;

export interface IPrizeHistoryParams {
  endDate?: Date | string;
  page?: number;
  searchText?: string;
  size?: number;
  startDate?: Date | string;
}

export interface IDataPrizeHistory {
  data: {
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

export type IPropsPrizeHistoryTableRow = {
  row: IPrizeHistory;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
};

export interface IPayloadSearch {
  payload: string;
  type: string;
}
export interface IPayloadDate {
  payload: Date | string;
  type: string;
}
