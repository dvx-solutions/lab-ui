import { IColumnProps } from 'devextreme-react/data-grid';

export interface IDataGridColumnProps<T = string> extends IColumnProps {
  dataField: T;
  caption?: string;
}
