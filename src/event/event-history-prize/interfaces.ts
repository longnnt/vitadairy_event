export interface IHistoryListEventParams {
  endDate?: Date | null;
  page?: number;
  searchText?: string;
  size?: number;
  startDate?: Date | null;
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
  endDate?: Date | null;
  page?: number;
  searchText?: string;
  size?: number;
  startDate?: Date | null;
}

export interface IGetPage {
  page?: number;
  size?: number;
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

export interface IFormCreateEvent {
  eventDetailProvinces: {
    endDate: Date | string;
    id: number;
    provinceId: number;
    quantity: number;
    startDate: Date | string;
  }[];
  eventId: number;
  giftId: number;
  id: number;
  notificationContent: string;
  notificationDescription: string;
  notificationTitle: string;
  ordinal: number;
  popupCode: string;
  popupImageLink: string;
  popupLink: string;
  popupType: string;
  probability: number;
  quantity: number;
  transactionTypeId: string;
}

export interface ITransactionType {
  id: number;
  code: string;
  name: string;
  description: string;
}

export interface IProvinceType {
  id: number;
  code: string;
  name: string;
  type: string;
  parentId: number;
  regionId: null;
}

export interface IResTransaction {
  data: {
    meta: {
      status: number;
      msg: string;
    };
    response: ITranSacTion[];
  };
}

export interface IResProvince {
  data: {
    meta: {
      status: number;
      msg: string;
    };
    response: IProvince[];
  };
}

interface ITranSacTion {
  id: number;
  code: string;
  name: string;
  description: string;
  mainCode: string;
  eventDetail: null;
}

interface IProvince {
  id: number;
  code: number;
  name: string;
  type: string;
  parentId: number;
  regionId: null;
}

export interface IPayloadSearch {
  payload: string;
  type: string;
}
export interface IPayloadDate {
  payload: Date | null;
  type: string;
}

export interface IFormFilter {
  searchText: string;
  endDate: Date | null;
  startDate: Date | null;
}

export interface ISelectPopup {
  value: string;
  label: string;
}
