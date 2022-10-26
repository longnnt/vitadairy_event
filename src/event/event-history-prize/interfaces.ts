export interface IHistoryListEventParams {
  endDate?: Date | string;
  page?: number;
  searchText?: string;
  size?: number;
  startDate?: Date | string;
}

export interface IPrizeHistory {
  code: string;
  name: string;
  phoneNumber: number;
  address: string;
  qrLink: string;
  isActive: boolean;
  createdDate: string;
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
  };
}

export type IPropsPrizeHistoryTableRow = {
  row: IPrizeHistory;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
};

export type IFormEventValuesProps = {
  thumbnail: string | null;
  isFeature: boolean;
  location: string;
  timeStart: Date | null;
};

export interface IFormCreateEvent {
  eventDetailProvinces: {
    endDate: Date | string;
    id: number;
    provinceId: number;
    quantity: number;
    startDate: Date | string;
  };
  eventId: number,
  giftId: number,
  id: number,
  notificationContent: string,
  notificationDescription: string,
  notificationTitle: string,
  ordinal: 0,
  popupCode: string,
  popupImageLink: string,
  popupLink: string,
  popupType: string,
  probability: number,
  quantity: number,
  transactionTypeId: number
};

export interface ITransactionType {
  id: number,
  code: string,
  name: string,
  description: string
}
