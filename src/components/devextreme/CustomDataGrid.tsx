import DataGrid, {
  Column,
  ColumnChooser,
  Export,
  Paging,
  FilterBuilderPopup,
  FilterRow,
  Grouping,
  GroupPanel,
  HeaderFilter,
  IDataGridOptions,
  SearchPanel,
  Sorting,
  Summary,
  GroupItem,
} from 'devextreme-react/data-grid';
import DataSource from 'devextreme/data/data_source';
import { locale, loadMessages } from 'devextreme/localization';
import ptMessages from 'devextreme/localization/messages/pt.json';
import { ReactNode } from 'react';

import { classNames, obterCPFComMascara } from '+/lib';
import { IDataGridColumnProps } from '+/types';

import {
  CellType,
  DatagridRegisterActions,
  DatagridRegisterActionsProps,
} from '.';

interface Props extends IDataGridOptions {
  aditionalActions?: DatagridRegisterActionsProps['aditionalActions'];
  axiosInstance: DatagridRegisterActionsProps['axiosInstance'];
  queryClientInstance: DatagridRegisterActionsProps['queryClientInstance'];
  aditionalActionsWithFnc?: DatagridRegisterActionsProps['aditionalActionsWithFnc'];
  children?: ReactNode;
  currentPage?: number;
  currentPageSize?: number;
  customColumns: IDataGridColumnProps[];
  dataSource: IDataGridOptions['dataSource'];
  hasFather?: boolean;
  maxHeight?: string;
  nome: string;
  onEditRegisterRequest?: (e: {
    data: { data: Record<string, unknown> };
  }) => void;
  onPageChange?: (e: number) => void;
  pathOfRegisterToDelete?: string;
  customDeleteRoute?: (e: {
    data: { data: Record<string, unknown> };
  }) => string;
  queryToInvalidate?: string;
  onPageSizeChange?: (e: number) => void;
  shouldAutoExpandAll?: boolean;
  shouldPaginate?: boolean;
  shouldRenderColumnChooser?: boolean;
  shouldRenderExport?: boolean;
  shouldRenderSearchPanel?: boolean;
  totalCount?: number;
  usePaging?: boolean;
  shouldNotRenderCRUDActions?: boolean;
}

export function CustomDataGrid({
  aditionalActions,
  axiosInstance,
  queryClientInstance,
  aditionalActionsWithFnc,
  children,
  className = '',
  currentPageSize,
  customColumns,
  customDeleteRoute,
  dataSource,
  hasFather = false,
  nome,
  onEditRegisterRequest,
  pathOfRegisterToDelete,
  queryToInvalidate,
  shouldAutoExpandAll = false,
  shouldNotRenderCRUDActions = false,
  usePaging = false,
  ...rest
}: Props) {
  loadMessages(ptMessages);
  locale('pt-BR');

  const parsedDataSource = new DataSource({
    load: async () => {
      await new Promise(resolve => {
        resolve(1);
      });
      return {
        data: dataSource,
      };
    },
    pageSize: currentPageSize,
  });

  const [firtsRecord] = (dataSource as Record<string, unknown>[]) ?? [];

  const allColumnsFromAPI = Object.entries(firtsRecord ?? []).map(t => t[0]);
  const receivedColumns = customColumns.map(t => t.dataField);
  const allColumnsFiltered = allColumnsFromAPI.filter(
    i => !receivedColumns.includes(i)
  );

  const parsedColumns: IDataGridColumnProps[] = [
    ...customColumns,
    ...allColumnsFiltered.map(x => ({
      dataField: x,
      visible: false,
    })),
  ];

  const getCellComponent = (e: CellType) =>
    DatagridRegisterActions({
      aditionalActions,
      e,
      onEditDataRequest: e.data.data.readonly
        ? undefined
        : onEditRegisterRequest,
      pathToDeleteRegister: pathOfRegisterToDelete,
      queryToInvalidate: queryToInvalidate ?? '',
      customDeleteRoute,
      aditionalActionsWithFnc,
      axiosInstance,
      queryClientInstance,
    });

  return (
    <div
      className={classNames(
        'flex flex-col rounded-md bg-white',
        hasFather ? 'p-0' : 'p-2 shadow-md',
        className.includes('max-h')
          ? className
              .split(' ')
              .filter(x => !x.startsWith('max-h'))
              .join(' ')
          : ''
      )}
      id={nome.replaceAll(' ', '-').toUpperCase()}
    >
      <DataGrid
        allowColumnReordering
        allowColumnResizing
        columnAutoWidth
        dataSource={parsedDataSource}
        pager={{
          allowedPageSizes: [10, 25, 50, 100, 'all'],
          showInfo: !usePaging,
          showNavigationButtons: !usePaging,
          showPageSizeSelector: !usePaging,
          visible: !usePaging,
        }}
        rowAlternationEnabled
        showBorders
        className={classNames(
          'h-full',
          className.includes('max-h') ? '' : 'max-h-[calc(100vh-12rem)]',
          className
        )}
        {...rest}
      >
        <ColumnChooser enabled mode="select" />
        <Export enabled fileName={`Exportação de dados - ${nome}`} />
        <FilterBuilderPopup />
        <FilterRow visible />
        <Grouping autoExpandAll={shouldAutoExpandAll} />
        <GroupPanel visible />
        <HeaderFilter visible />
        <Paging defaultPageSize={10} />
        <SearchPanel visible width={300} placeholder="Pesquisar" />
        <Sorting mode="multiple" />

        {!shouldNotRenderCRUDActions && (
          <Column
            alignment="center"
            allowExporting={false}
            allowFiltering={false}
            allowSorting={false}
            caption="Ações"
            cellComponent={getCellComponent}
            dataField="id"
            width={40 * (aditionalActions ? aditionalActions.length + 2 : 2)}
          />
        )}

        {parsedColumns.map(column => (
          <Column
            {...column}
            key={`${column.dataField} - ${column.caption}`}
            name={`${column.dataField} - ${column.caption}`}
            allowFiltering
            customizeText={
              column.dataField === 'cpf'
                ? (e: { value: string }) => obterCPFComMascara(e.value)
                : column.customizeText
            }
          />
        ))}

        <Summary>
          <GroupItem
            column="id"
            summaryType="count"
            customizeText={(e: { value: number }) =>
              e.value === 1 ? '1 registro' : `${e.value} registros`
            }
          />
        </Summary>

        {children || null}
      </DataGrid>
    </div>
  );
}

export default CustomDataGrid;
