import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  IBodyRequest,
  INaturezaConta,
  IQueryParams,
  TSelectOption,
} from '+/types';

interface IUseNaturezasContasProps {
  advancedSearch?: IBodyRequest<keyof INaturezaConta>['advancedSearch'];
  API_Instance: AxiosInstance;
  pageNumber?: IBodyRequest['pageNumber'];
  pageSize?: IBodyRequest['pageSize'];
  keyword?: string;
  orderBy?: string[];
  analitico?: boolean | null;
  listaOrigens?: number[];
}

export const useNaturezasContas = ({
  advancedSearch,
  API_Instance,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 1000,
  analitico = null,
  listaOrigens = [1, 2, 3, 4],
}: IUseNaturezasContasProps) => {
  return useQuery(
    [
      'naturezas-contas',
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      `keyword-${keyword}`,
      `orderBy-${orderBy}`,
      `analitico-${analitico}`,
      `listaOrigens-${listaOrigens.join(',')}`,
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const payload = {
        advancedSearch,
        keyword,
        orderBy,
        pageNumber,
        pageSize,
        analitico,
        listaOrigens,
      };

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<INaturezaConta[]>
      >('empresarial/naturezas-contas/listar', payload);

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.codigo} - ${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
};
