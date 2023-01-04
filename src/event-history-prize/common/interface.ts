
export interface IPrizeHistory {
  id: string;
  userName: string;
  phoneNumber: number;
  giftName: string;
  qr: string;
  giftReceivedDate: string;
  spoonCode: string;
}

export type StateProps = {
  searchText: string;
  startDate: Date | null;
  endDate: Date | null;
};

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

export interface IPrizeHistoryParams {
  endDate?: Date | null;
  page?: number;
  searchText?: string;
  size?: number;
  startDate?: Date | null;
}

export type IPropsPrizeHistoryTableRow = {
  row: IPrizeHistory;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
};

