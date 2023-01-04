export interface IListGroupEvent {
  id: number;
  name: string;
}

export interface IListGroupEventById extends IListGroupEvent {
  events: number[];

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
      status: number;
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

export interface IDataListGroupEventById {
  data:{

    response:IListGroupEventById;
    meta:{
      msg: string;
      status: number;
    }
  }
}


export type IListGroupEventCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export interface IFormDataGroupEvent {
  id?: number;
  name: string;
  eventIds: number[];
}

export interface ITableGroupEventPayload{
  alert: boolean;
  itemRowId?: number;
}