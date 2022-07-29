import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

import { convertAdvancedSearchToReactQueryKeys } from '+/lib';
import { TSelectOption } from '+/types';
import { IAPIPaginatedResponse, IBodyRequest } from '+/types/axios';
import { IGrupoCargo } from '+/types/models/colaboradores';

interface IUseGruposCargo {
  advancedSearch?: IBodyRequest<keyof IGrupoCargo>['advancedSearch'];
  API_Instance: AxiosInstance;
  empresaId: number;
  pageNumber?: IBodyRequest['pageNumber'];
  pageSize?: IBodyRequest['pageSize'];
}

export const useGruposCargo = ({
  advancedSearch,
  API_Instance,
  empresaId,
  pageNumber = 1,
  pageSize = 25,
}: IUseGruposCargo) => {
  return useQuery(
    [
      'grupos-cargo',
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      `page-${pageNumber}-size-${pageSize}`,
    ],
    async () => {
      if (empresaId === 0) return null;

      const payload = {
        advancedSearch,
        empresaId,
        pageNumber,
        pageSize,
      } as IBodyRequest<keyof IGrupoCargo>;

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IGrupoCargo[]>
      >('colaboradores/grupos-cargos/listar', payload);

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.codigo} - ${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
};
