import { useQuery } from 'react-query';
import { AxiosInstance } from 'axios';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  IBodyRequest,
  IUnidadeNegocio,
  TSelectOption,
} from '+/types';

interface IProps {
  advancedSearch?: IBodyRequest<keyof IUnidadeNegocio>['advancedSearch'];
  API_Instance: AxiosInstance;
  pageNumber?: IBodyRequest['pageNumber'];
  pageSize?: IBodyRequest['pageSize'];
}

export function useUnidadeNegocio({
  advancedSearch,
  API_Instance,
  pageNumber = 1,
  pageSize = 25,
}: IProps) {
  return useQuery(
    [
      'unidade-negocio',
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const payload: IBodyRequest = {
        advancedSearch,
        orderBy: ['nomeFantasia'],
        pageNumber,
        pageSize,
      };

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IUnidadeNegocio[]>
      >('empresarial/unidades-negocios/listar', payload);

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.codigo} - ${x.nomeFantasia}`,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
}
