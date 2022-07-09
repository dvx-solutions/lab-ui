import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

import { convertAdvancedSearchToReactQueryKeys } from '+/types';
import { IAPIPaginatedResponse, IBodyRequest } from '+/types/axios';
import { ICargo } from '+/types/models/colaboradores';

interface IUseCargos {
  advancedSearch?: IBodyRequest['advancedSearch'];
  API_Instance: AxiosInstance;
  empresaId: number;
  pageNumber?: number;
  pageSize?: number;
}

export const useCargos = ({
  advancedSearch,
  API_Instance,
  empresaId,
  pageNumber = 1,
  pageSize = 9999,
}: IUseCargos) => {
  return useQuery(
    [
      'cargos',
      `empresa-${empresaId}`,
      `page-number-${pageNumber}`,
      `page-size-${pageSize}`,
      `empresa-${empresaId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
    ],
    async () => {
      const { data } = await API_Instance.post<IAPIPaginatedResponse<ICargo[]>>(
        'colaboradores/cargos/listar',
        {
          pageNumber,
          pageSize,
          empresaId,
          advancedSearch,
        } as IBodyRequest<keyof ICargo>
      );

      return data;
    }
  );
};
