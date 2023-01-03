export interface IFormListEvent {
  id: number;
  name: string;
  userRegisterDate: string | null;
  startDate: string | null;
  endDate: string | null;
  userLimit: number;
  defaultWinRate: number;
  upRate: number;
  downRate: number;
  status: string;
  eventCustomerLimit: number;
  eventStoreLimit: number;
  groupName: string
}

export interface IFormCreateEvent {
  name: string;
  eventGroupId: number;
  startDate: string | null;
  endDate: string | null;
  eventCustomerLimit: number;
  eventStoreLimit: number;
  status: string;
  defaultWinRate: number;
  upRate: number;
  downRate: number;
  skus: string[];
}

export type IManageEventAdminCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export interface IDataListEvent {
  data:{
    meta: {
      status: number;
      msg: string;
    };
    response: IFormListEvent[];
    pagination: {
      totalRecords: number;
      currentPage: number;
      recordsPerPage: number;
      totalPages: number;
      last: boolean;
    };
  }
}
export interface IFormEditManageEvent {
  name: string;
  eventGroupId: number;
  startDate: string | null;
  endDate: string | null;
  eventCustomerLimit: number;
  eventStoreLimit: number;
  status: string;
  skus: string[];
  defaultWinRate: number;
  upRate: number | null;
  downRate: number;
  id:number
}
export interface IManageEventParams {
  startDate: Date | null;
  page?: number;
  searchText: string;
  limit?: number;
  endDate: Date | null;
  searchBy: string | boolean;
  status?: string | boolean;


 
}

export interface IEventGroup {
  page:number;
  searchText?: string;

}
export interface IPayloadDate {
  payload: Date | null;
  type: string;
}

export type IPropsListEventTableRow = {
  row: IFormListEvent;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
};

export type StateProps = {
  searchBy: string | boolean;
  searchText: string;
  status: string | boolean;
  startDate: Date | null;
  endDate: Date | null;
  selectedIds: number[];
  isResetSelect: boolean;
  openEditModal: boolean;
  confirmEdit: boolean;
};

export interface IProCodeSelect {
  value: string;
  label: string;
}


export type IUpdateEventOneCallback = {
  onError: VoidFunction;
};