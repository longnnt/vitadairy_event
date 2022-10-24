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
}

export type TimeProps = Dayjs | null | Date;

interface IThumbnailEvent {
  id: number;
  url: string;
}

export interface IEvent {
  id: number;
  thumbnail: IThumbnailEvent;
  location: string;
  field: string;
  timeStart: string;
  isFeature: -1 | 1;
  title: string;
  slug: string;
  shortDesc: string;
  content: string;
}
export interface IResEvents {
  data: Array<IEvent>;
  total: number;
}

export interface IEventCallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}
