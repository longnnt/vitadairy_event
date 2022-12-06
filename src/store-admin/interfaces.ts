export interface IFormStore {
  code: string;
  name: string;
  phoneNumber: string;
  address: string;
  qrLink: string;
  isActive: boolean;
  createdDate: string;
}

export interface IFormStoreAction {
  data:{
    response:{
      response:IFormStore
    }
  }
}

export interface IPayloadSearch {
  payload: string;
  type: string;
}
export interface IPayloadDate {
  payload: Date | null;
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

export interface IStories { 
  data: Array<IFormStore>;
  total: number;
}

export interface IStoreParams {
  startDate?: Date | null;
  page?: number;
  searchText?: string;
  size?: number;
  endDate?: Date | null;
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
      },
      pagination: {
        totalPages: number;
        totalRecords: number;
        currentPage: number;
        recordsPerPage: number;
        last: boolean;
      };
      response: IFormStore[];
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
