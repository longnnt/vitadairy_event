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
  eventDetail: IEventFormData;
}

export type TimeProps = Dayjs | Date | null;

export interface IResEvents {
  data: Array<IEventFormData>;
  total: number;
}

export interface IEventCallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}

export interface FormNewEventProps {
  nameEvent: string;
  startDate: TimeProps;
  endDate: TimeProps;
  skus: string[];
  defaultWinRate: number;
  upRate: number;
  downRate: number;
  typeUser: TimeProps | null;
  userRegisterDate: TimeProps;
  userLimit: number;
  id: 0;
}

export interface IEventFormData {
  name: string;
  startDate: Date | null;
  endDate: Date;
  defaultWinRate: number;
  upRate: number;
  downRate: number;
  userRegisterDate: Date;
  userLimit: number;
  id: string;
  skus: string[];
}
