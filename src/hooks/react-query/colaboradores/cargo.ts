import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

import { convertAdvancedSearchToReactQueryKeys } from '+/lib/formatters';
import { TSelectOption } from '+/types';
import {
  IAPIPaginatedResponse,
  IAPIResponse,
  IBodyRequest,
} from '+/types/axios';
import { ICargo } from '+/types/models/colaboradores';

interface IUseCargos {
  advancedSearch?: IBodyRequest['advancedSearch'];
  API_Instance: AxiosInstance;
  empresaId: number;
  pageNumber?: number;
  pageSize?: number;
}

interface IUseCargoPorId {
  axiosInstance: AxiosInstance;
  id: number;
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

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.codigo} - ${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
};

export const useCargoPorId = ({ axiosInstance, id }: IUseCargoPorId) => {
  return useQuery(['cargos', `id-${id}`], async () => {
    if (id <= 0) return null;

    return axiosInstance
      .get<IAPIResponse<ICargo>>(`colaboradores/cargos/${id}`)
      .then(({ data }) => data);
  });
};
