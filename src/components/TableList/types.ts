export enum ColumnType {
  Text,
  ActionComponent,
  Date,
  Chip,
  CheckBox,
  Image,
}

export interface Mapper<T> {
  key: T;
  value: string;
}

export interface Column {
  id: string;
  label: string;
  sortable: boolean;
  type: ColumnType;
  minWidth?: number;
  width?: number;
  align?: 'right';
  format?: (value: number) => string;
  hoverMapper?: Mapper<any>[];
  colorMapper?: Mapper<any>[];
}

export interface TableListAction {
  buttonType: 'toggle' | 'icon';
  event: string;
  label: string;
  icon: string;
  confirmationRequired?: boolean;
  confirmationTitle?: string;
  confirmationDescription?: string;
  confirmationButtonLabel?: string;
  declineButtonLabel?: string;
  disabled?: boolean;
}