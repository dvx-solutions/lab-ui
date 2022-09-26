import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib/formatters';
import {
  IAPIPaginatedResponse,
  IQueryParams,
  ITipoOrdemServico,
  TSelectOption,
} from '+/types';

export const useTiposOrdensServicos = ({
  advancedSearch,
  API_Instance,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 100000,
}: IQueryParams<keyof ITipoOrdemServico>) =>
  useQuery(
    [
      'tipos-ordens-servicos',
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const payload = {
        advancedSearch,
        keyword,
        orderBy,
        pageNumber,
        pageSize,
      };

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<ITipoOrdemServico[]>
      >('producoes/tipos-ordens-servicos/listar', payload);

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.codigo} - ${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
