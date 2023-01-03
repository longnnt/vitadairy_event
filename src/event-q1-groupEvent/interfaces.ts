export interface IListGroupEvent {
  id: number;
  name: string;
}

export interface IPropsListGroupEventTableRow {
  row: IListGroupEvent;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
}

export interface ITablePayload{
  alertStatus?: boolean;
  itemId?: string[];
}

export type IListGroupEventArray = Array<IListGroupEvent>;

export interface IListGroupEventParams {
  page?: number;
  searchText?: string;
  limit?: number;
}

export interface IDataListGroupEvents {
  data:{
    response:IListGroupEventArray;
    meta:{
      msg: string;
      status: string;
    }
    pagination:{
      totalRecords: number;
      recordsPerPage: number;
      currentPage: number;
      totalPages: number;
      last: boolean;
    }
  }

}

export type IListGroupEventCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export interface IFormDataGroupEvent {
  name: string;
  eventIds: number[];
}