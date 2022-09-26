import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  IProposta,
  IQueryParams,
  TSelectOption,
} from '+/types';

interface IUsePropostas extends IQueryParams<keyof IProposta> {
  empresaResponsavelId: number;
}

export const usePropostas = ({
  advancedSearch,
  API_Instance,
  empresaResponsavelId,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
}: IUsePropostas) => {
  return useQuery(
    [
      'propostas',
      `empresaResponsavelId-${empresaResponsavelId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const payload = {
        advancedSearch,
        empresaResponsavelId,
        keyword,
        orderBy,
        pageNumber,
        pageSize,
      };

      if (empresaResponsavelId <= 0) return null;

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IProposta[]>
      >('faturamentos/propostas/listar', payload);

      const options: TSelectOption[] = data.data.map(({ numero, id }) => ({
        text: numero,
        value: id,
      }));

      return { ...data, options };
    }
  );
};
