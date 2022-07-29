import { useQuery } from '@tanstack/react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  IBodyRequest,
  IClasseCargo,
  IQueryParams,
  TSelectOption,
} from '+/types';

interface IUseClasseCargo extends IQueryParams<keyof IClasseCargo> {
  empresaId: number;
}

export const useClasseCargo = ({
  advancedSearch,
  API_Instance,
  empresaId,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
}: IUseClasseCargo) => {
  const payload = {
    advancedSearch,
    empresaId,
    keyword,
    orderBy,
    pageNumber,
    pageSize,
  } as IBodyRequest;

  return useQuery(
    [
      'classe-cargo',
      `empresaId-${empresaId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IClasseCargo[]>
      >('colaboradores/classes-cargos/listar', payload);

      const options: TSelectOption[] = data.data.map(x => ({
        text: x.codigo,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
};
