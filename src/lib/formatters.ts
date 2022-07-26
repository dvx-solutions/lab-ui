import { IBodyRequest } from '+/types/axios';

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const convertToCurrency = (
  value: number,
  shouldNotRenderSign?: boolean
) => {
  shouldNotRenderSign = shouldNotRenderSign || false;

  if (shouldNotRenderSign)
    return new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      currency: 'BRL',
      minimumFractionDigits: 2,
      compactDisplay: 'long',
      signDisplay: 'never',
    }).format(Number(value));

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const convertToDecimal = (value: string | number) => {
  if (value.toString().trim() === '') {
    return '0,00';
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    currency: 'BRL',
    minimumFractionDigits: 2,
    compactDisplay: 'long',
    signDisplay: 'never',
  }).format(+Number(value).toFixed(2));
};

export const convertToFloat = (value: string) => {
  if (value !== undefined && value.trim() !== '') {
    return parseFloat(value.replace(/[.]/g, '').replace(',', '.'));
  }

  return 0;
};

export const devexextremeCurrencyFormat = {
  style: 'currency',
  currency: 'BRL',
  precision: 2,
};

export const yesOrNoCellDevextremeCellRender = ({
  displayValue,
}: {
  displayValue: number | string;
}) => (Number(displayValue) === 0 ? 'Não' : 'Sim');

export const convertEnumToSelectOptions = (
  enumobj: Record<string, number | string>
) => {
  return Object.entries(enumobj)
    .filter(f => !Number.isNaN(Number(f[1])))
    .map(x => ({
      text: x[0].trim(),
      value: x[1],
    }))
    .sort((a, b) => a.text.localeCompare(b.text));
};

export const convertCurrencyInputValueToNumber = (value: string) => {
  return Number(value.replaceAll('.', '').replaceAll(',', '.'));
};

export const formatBoolToNumber = (value: boolean) => {
  return value ? 1 : 0;
};

export const convertAdvancedSearchToReactQueryKeys = (
  advancedSearch: IBodyRequest['advancedSearch']
) => {
  return (
    advancedSearch
      ?.map(x =>
        x.fields[0] !== 'recursoId' && x.fields[0] !== 'colaboradorId'
          ? `${x.fields[0]}-${x.keyword}`
          : ''
      )
      .join(',') ?? ''
  );
};

export const obterCPFComMascara = (value: string) => {
  if (!value) return '';

  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const getReactQueryPaginationKeys = (
  pageNumber: number,
  pageSize: number
) => `page-${pageNumber}-size-${pageSize}`;
