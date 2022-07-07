import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

import { IUnidade } from '+/types/models/empresarial';
import { IAPIPaginatedResponse, IBodyRequest } from '+/types/axios';
import { convertAdvancedSearchToReactQueryKeys } from '+/lib/formatters';

interface IUseUnidades {
  API_Instance: AxiosInstance;
  planoId: number;
  pageNumber?: IBodyRequest['pageNumber'];
  pageSize?: IBodyRequest['pageSize'];
  advancedSearch?: IBodyRequest<keyof IUnidade>['advancedSearch'];
}

export const useUnidades = ({
  API_Instance,
  planoId,
  advancedSearch,
  pageNumber = 1,
  pageSize = 9999,
}: IUseUnidades) => {
  return useQuery(
    [
      'unidades',
      `plano-id-${planoId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      `pageNumber-${pageNumber}`,
      `pageSize-${pageSize}`,
    ],
    async () => {
      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IUnidade[]>
      >('empresarial/unidades/listar', {
        pageNumber,
        pageSize,
        advancedSearch: [
          advancedSearch ? { ...advancedSearch } : {},
          { fields: ['planoId'], keyword: planoId.toString() },
        ],
      } as IBodyRequest<keyof IUnidade>);

      return data;
    }
  );
};
