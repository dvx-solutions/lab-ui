import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib/formatters';
import { IQueryParams, IQueryByIdParams } from '+/types';
import {
  IAPIPaginatedResponse,
  IAPIResponse,
  IBodyRequest,
} from '+/types/axios';
import { IColaborador } from '+/types/models/colaboradores';

interface Props extends IQueryParams<keyof IColaborador> {
  cargoId?: number;
  empresaId: number;
  setorId?: number;
  unidadeNegocioId?: number;
}

export const useColaboradores = ({
  advancedSearch,
  API_Instance,
  cargoId,
  empresaId,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
  setorId,
  unidadeNegocioId,
}: Props) => {
  return useQuery(
    [
      'colaboradores',
      `empresaId-${empresaId}`,
      `cargoId-${cargoId}`,
      `setorId-${setorId}`,
      `unidadeNegocioId-${unidadeNegocioId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const payload = {
        advancedSearch,
        cargoId,
        empresaId,
        keyword,
        orderBy,
        pageNumber,
        pageSize,
        setorId,
        unidadeNegocioId,
      } as IBodyRequest;

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IColaborador[]>
      >('colaboradores/colaboradores/listar', payload);

      return data;
    },
    { refetchInterval: false }
  );
};

export const useColaboradorPorId = ({ axiosInstance, id }: IQueryByIdParams) =>
  useQuery(['colaboradores', `id-${id}`], () =>
    id > 0
      ? axiosInstance
          .get<IAPIResponse<IColaborador>>(`colaboradores/colaboradores/${id}`)
          .then(({ data }) => data)
      : null
  );
