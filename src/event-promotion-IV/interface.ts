import { Dayjs } from 'dayjs';
export type RowProps = {
  id: number;
  nameEvent: string;
  startDate: number;
  endDate: number;
};

export interface EventTableRowProps {
  row: RowProps;
  onSelectRow: (checked: boolean) => void;
  selected: boolean;
  onDeleteRow: () => void;
}

export interface initialValueProps {
  timeStartValue: TimeProps;
  timeEndValue: TimeProps;
  searchInputValue: string;
  isFilter: boolean;
  isDeleteSelected: boolean;
  isOpenMenu: HTMLElement | null;
  eventDetail: IEvent;
}

export type TimeProps = Dayjs | Date | null;

export type IEvent = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  defaultWinRate: number;
  upRate: number;
  downRate: number;
  userRegisterDate: Date;
  userLimit: number;
  skus: string[];
};
export interface IResEvents {
  data: Array<IEvent>;
  total: number;
}

export interface IEventCallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}
