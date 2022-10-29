import { Dayjs } from 'dayjs';
export type RowProps = {
  id: number;
  name: string;
  startDate: number;
  endDate: number;
};

export interface EventTableRowProps {
  row: RowProps;
  onSelectRow: (checked: boolean) => void;
  selected: boolean;
  onDeleteRow: VoidFunction;
  onViewRow: (r: RowProps) => void;
}

export interface initialValueProps {
  startDate: Date | null;
  endDate: Date | null;
  searchText: string;
  isFilter: boolean;
  isDeleteSelected: boolean;
  isOpenMenu: HTMLElement | null;
  eventDetail: IEventFormData;
  userType: 'allUser' | 'newUser';
}

export type TimeProps = Date | null;

export interface IResEvents {
  data: Array<IEventFormData>;
  total: number;
}

export interface IEventCallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
  onSuccessSend?: VoidFunction;
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
  id: number;
}

export interface IEventFormData {
  name: string;
  startDate: Date;
  endDate: Date;
  defaultWinRate: number;
  upRate: number;
  downRate: number;
  userRegisterDate: Date;
  userLimit: number;
  id: number;
  skus: string[];
}

export interface IEventDetailFormData {
  response: {
    name: string;
    startDate: Date;
    endDate: Date;
    defaultWinRate: number;
    upRate: number;
    downRate: number;
    userRegisterDate: Date;
    userLimit: number;
    id: number;
    skus: string[];
  };
}

export interface EventSearchParams {
  startDate?: TimeProps;
  page?: number;
  endDate?: TimeProps;
  searchText?: string;
  size?: number;
}

export interface PaginationProps {
  totalPages?: number;
  totalRecords?: number;
  currentPage?: number;
  recordsPerPage?: number;
  last?: boolean;
}
