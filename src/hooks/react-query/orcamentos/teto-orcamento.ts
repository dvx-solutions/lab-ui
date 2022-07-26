import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import { IAPIPaginatedResponse, IBodyRequest, ITetoOrcamento } from '+/types';

interface IProps {
  advancedSearch?: IBodyRequest<keyof ITetoOrcamento>['advancedSearch'];
  API_Instance: AxiosInstance;
  empresaAnoFiscalId: number;
  naturezaOrcamentoId: number;
  pageNumber?: IBodyRequest['pageNumber'];
  pageSize?: IBodyRequest['pageSize'];
}

export const useTetoOrcamento = ({
  advancedSearch,
  API_Instance,
  empresaAnoFiscalId,
  naturezaOrcamentoId,
  pageNumber = 1,
  pageSize = 25,
}: IProps) => {
  return useQuery(
    [
      'teto-orcamento',
      `empresaAnoFiscalId-${empresaAnoFiscalId}`,
      `naturezaOrcamentoId-${naturezaOrcamentoId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      if (empresaAnoFiscalId === 0) return null;
      if (naturezaOrcamentoId === 0) return null;

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<ITetoOrcamento[]>
      >('orcamentos/teto-orcamentos/listar', {
        advancedSearch,
        empresaAnoFiscalId,
        naturezaOrcamentoId,
        pageNumber,
        pageSize,
      });

      return data;
    }
  );
};
