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

export interface IResEventById {
  data: {
    meta: {
      status: number;
      msg: string;
    };
    response: IFormCreateEvent;
  };
}

export interface IFormCreateEvent {
  eventDetailProvinces: IEventDetail[];
  eventId: number;
  giftId: number;
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
  transactionTypeId: number;
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

export interface IEventDetail {
  endDate: Date | string;
  provinceId: number;
  quantity: number;
  startDate: Date | string;
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

export interface IGift {
  id: number;
  type: string;
  money: string;
  name: string;
}

export interface IResGift {
  data: {
    pagination: {
      totalPages: number;
      totalRecords: number;
      currentPage: number;
      recordsPerPage: number;
      last: boolean;
    };
    response: IGift[];
  };
}

export type IPropsGiftTableRow = {
  row: IGift;
  handleClose: Function;
};

export type IGiftParams = {
  page?: number;
  size?: number;
};
