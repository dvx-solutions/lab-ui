import { useQuery } from '@tanstack/react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  IBodyRequest,
  IEmpresa,
  IQueryParams,
  TSelectOption,
} from '+/types';

export const useEmpresas = ({
  advancedSearch,
  API_Instance,
  pageNumber = 1,
  pageSize = 25,
  ...rest
}: IQueryParams<keyof IEmpresa>) =>
  useQuery(
    [
      'empresas',
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const payload = {
        advancedSearch,
        pageNumber,
        pageSize,
        ...rest,
      } as IBodyRequest;

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IEmpresa[]>
      >('empresarial/empresas/listar', payload);

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.codigo} - ${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
