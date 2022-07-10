import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

import { convertAdvancedSearchToReactQueryKeys } from 'lib/formatters';
import { IAPIPaginatedResponse, IBodyRequest } from 'types/axios';
import { IUnidadeCentro } from 'types/models/empresarial';

interface IUseUnidadeCentros {
  advancedSearch?: IBodyRequest<keyof IUnidadeCentro>['advancedSearch'];
  API_Instance: AxiosInstance;
  centroId?: number;
  pageNumber?: IBodyRequest['pageNumber'];
  pageSize?: IBodyRequest['pageSize'];
  unidadeId: number;
}

export const useUnidadeCentros = ({
  advancedSearch,
  API_Instance,
  centroId,
  pageNumber = 1,
  pageSize = 9999,
  unidadeId,
}: IUseUnidadeCentros) => {
  return useQuery(
    [
      'unidade-centros',
      `unidade-id-${unidadeId}`,
      `centro-id-${centroId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      `pageNumber-${pageNumber}`,
      `pageSize-${pageSize}`,
    ],
    async () => {
      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IUnidadeCentro[]>
      >('empresarial/unidades-centros/listar', {
        pageNumber,
        pageSize,
        advancedSearch: [
          advancedSearch && { ...advancedSearch },
          { fields: ['unidadeId'], keyword: unidadeId.toString() },
          centroId && {
            fields: ['centroId'],
            keyword: centroId?.toString() ?? '',
          },
        ].filter(x => x),
      } as IBodyRequest<keyof IUnidadeCentro>);

      return data;
    }
  );
};
