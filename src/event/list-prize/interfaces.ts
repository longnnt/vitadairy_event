export interface IListPrizeEventParams {
  eventId?: number | string;
  page?: number;
  searchText?: string;
  size?: number;
}

export interface IListPrize {
  id: number;
  giftName: string;
  ordinal: number;
  probability: number;
  quantity: number;
}

export type IListPrizeCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export type IListPrizeArray = Array<IListPrize>;

export interface IListPrizeParams {
  eventId?: number | string;
  page?: number;
  searchText?: string;
  size?: number;
}

export interface IDataListPrize {
  data: {
    meta: {
      status: number;
      msg: string;
    };
    response: IListPrizeArray;
    pagination: {
      totalPages: number;
      totalRecords: number;
      currentPage: number;
      recordsPerPage: number;
      last: boolean;
    };
  };
}

export type IPropsListPrizeTableRow = {
  row: IListPrize;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;

};
export enum MessageType {
  ERROR = 'error',
  SUCCESS = 'success',
}

export interface IShowMessage {
  type: MessageType;
  message: string;
}

export interface ITablePayload{
  alertStatus?: boolean;
  itemId?: string[];
}