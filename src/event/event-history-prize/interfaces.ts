import { Dayjs } from 'dayjs';
import { GridRowsProp, GridRowModesModel } from '@mui/x-data-grid-pro';

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
  popupCode: string | null;
  popupImageLink: string;
  popupLink: string;
  popupType: string;
  probability: number;
  quantity: number;
  transactionTypeId: number;
  id?: number;
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
  id?: number | string;
  provinceId: number;
  quantity: number;
  endDate: Dayjs | Date | string;
  startDate: Dayjs | Date | string;
  name?: string;
  extraquantity?: number;
  isNew?: boolean;
}

export interface INotificationForm {
  notificationContent: string;
  notificationDescription: string;
  notificationTitle: string;
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
    response: {
      provinces: IProvince[];
    };
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

export interface ISelect {
  value: number;
  label: string;
}

export interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  importFile: any;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}
