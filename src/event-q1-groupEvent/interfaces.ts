export interface IListGroupEvent {
  id: number;
  groupEvent: string;
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