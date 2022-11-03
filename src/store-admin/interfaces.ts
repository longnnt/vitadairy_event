export interface IFormStore {
  code: string;
  name: string;
  phoneNumber: number;
  address: string;
  qrLink: string;
  isActive: boolean;
  createdDate: string;
}

export interface IPayloadSearch {
  payload: string;
  type: string;
}
export interface IPayloadDate {
  payload: Date | string;
  type: string;
}

export interface IStoreActive {
  code?: string;
  isActive: boolean;
}

export type IStoreAdminCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export type IStories = Array<IFormStore>;

export interface IStoreParams {
  endDate?: Date | string;
  page?: number;
  searchText?: string;
  size?: number;
  startDate?: Date | string;
}

export enum MessageType {
  ERROR = 'error',
  SUCCESS = 'success',
}

export interface IShowMessage {
  type: MessageType;
  message: string;
}

export interface IDataStore {
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
      response: IStories;
    };
  };
}

export type IPropsStoreTableRow = {
  row: IFormStore;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
};
