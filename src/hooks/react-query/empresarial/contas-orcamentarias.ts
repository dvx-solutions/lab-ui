import { useQuery } from '@tanstack/react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  IBodyRequest,
  IContaOrcamentaria,
  IQueryParams,
  TSelectOption,
} from '+/types';

interface Props extends IQueryParams<keyof IContaOrcamentaria> {
  analitico?: boolean | null;
  classificacao?: number;
  origem?: number;
  planoId: number;
}

export const useContasOrcamentarias = ({
  advancedSearch,
  analitico = null,
  API_Instance,
  classificacao,
  keyword,
  orderBy,
  origem,
  pageNumber = 1,
  pageSize = 25,
  planoId,
}: Props) => {
  return useQuery(
    [
      'contas-orcamentarias',
      `planoId-${planoId}`,
      `analitico-${analitico}`,
      `classificacao-${classificacao}`,
      `origem-${origem}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const payload = {
        advancedSearch,
        analitico,
        classificacao,
        keyword,
        orderBy,
        origem,
        pageNumber,
        pageSize,
        planoId,
      } as IBodyRequest;

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IContaOrcamentaria[]>
      >('empresarial/contas-orcamentarias/listar', payload);

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.codigo} - ${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
};
