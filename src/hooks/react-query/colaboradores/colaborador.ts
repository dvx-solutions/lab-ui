import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

import { convertAdvancedSearchToReactQueryKeys } from '+/lib/formatters';
import { IAPIPaginatedResponse, IBodyRequest } from '+/types/axios';
import { IColaborador } from '+/types/models/colaboradores';

interface IUseColaboradores {
  advancedSearch?: IBodyRequest['advancedSearch'];
  API_Instance: AxiosInstance;
  empresaId: number;
  pageNumber?: number;
  pageSize?: number;
}

export const useColaboradores = ({
  advancedSearch,
  API_Instance,
  empresaId,
  pageNumber = 1,
  pageSize = 50,
}: IUseColaboradores) => {
  return useQuery(
    [
      'colaboradores',
      `empresa-${empresaId}`,
      `page-number-${pageNumber}`,
      `page-size-${pageSize}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
    ],
    async () => {
      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IColaborador[]>
      >('colaboradores/colaboradores/listar', {
        pageNumber,
        pageSize,
        advancedSearch,
        empresaId,
      } as IBodyRequest<keyof IColaborador>);

      return data;
    },
    { refetchInterval: false }
  );
};
