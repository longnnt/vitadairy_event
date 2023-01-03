export interface IFormManageEvent {
  id: number;
  nameEvent: string;
  nameGroupEvent: string;
  startDate: string | null;
  endDate: string | null;
  prizeWinningUser: number;
  prizeWinningShop: number;
  status: string;
  skus: string[];
  defaultWinRate: number;
  upRate: number;
  downRate: number;
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
  searchText?: string;
  size?: number;
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
  row: IFormManageEvent;
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
};

export interface IProCodeSelect {
  value: string;
  label: string;
}


export type IUpdateEventOneCallback = {
  onError: VoidFunction;
};