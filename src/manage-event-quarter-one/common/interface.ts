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
  groupName: string;
}

export interface IPostCreateEvent {
  name: string;
  eventGroupId: string;
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

export interface ISubmitCreateEvent {
  name: string;
  eventGroupId: IEventGroupType | null;
  startDate: string | null;
  endDate: string | null;
  eventCustomerLimit: null | number;
  eventStoreLimit: null | number;
  status: string | boolean;
  defaultWinRate: null | number;
  upRate: null | number;
  downRate: null | number;
  skus: IProCodeSelect[];
}

export type IManageEventAdminCallback = {
  onSuccess?: VoidFunction;
  onError?: VoidFunction;
};

export interface IDataListEvent {
  data: {
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
  };
}


export interface IFormEditManageEvents {
  name: string;
  eventGroupId: string;
  startDate: string ;
  endDate: string ;
  eventCustomerLimit: number ;
  eventStoreLimit: number ;
  status: string;
  skus: any[];
  defaultWinRate: number;
  upRate: number;
  downRate: number;
  id:number
}
export interface IFormEditManageEvent {
  name: string;
  eventGroupId: {
    value:string,
    label:string
  } | null;
  startDate: string ;
  endDate: string ;
  eventCustomerLimit: number ;
  eventStoreLimit: number ;
  eventStatus: boolean;
  skus: any[];
  defaultWinRate: number;
  upRate: number;
  downRate: number;
  id:number
}

export interface IResEditManageEvent {
  data:{
     response:
      IFormEditManageEvent

  }
}
export interface IManageEventParams {
  startDate: Date | null;
  page?: number;
  searchText?: string;
  limit?: number;
  endDate: Date | null;
  searchBy?: string | boolean;
  status?: string | boolean;
}



export interface IEventGroup {
  page?:number;
  searchText?: string;
  limit?: number;

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
  handleGotoPrize: VoidFunction
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
  product: string[];
};

export interface IProCodeSelect {
  value: string;
  label: string;
}


export type IUpdateEventOneCallback = {
  onError: VoidFunction;
  onSuccess?: VoidFunction;

};
export interface IEventSearchParams {
  startDate?: Date | null;
  page?: number;
  endDate?: Date | null;
  searchText?: string;
  size?: number;
}

export interface IFormListEventGroup {
  id: number;
  name: string;
}
export interface IDataListEventGroup {
  data: {
    meta: {
      status: number;
      msg: string;
    };
    response: IFormListEventGroup[];
    pagination: {
      totalRecords: number;
      currentPage: number;
      recordsPerPage: number;
      totalPages: number;
      last: boolean;
    };
  };
}
export interface IEventGroupParams {
  searchText?: string;
  page?: number;
  limit?: number;
}

export interface IEventGroupType {
  label: string | null;
  value: string | null;
}

export interface IStatusParams {
  id: number;
  status: string;
}