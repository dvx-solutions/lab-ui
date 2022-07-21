import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

import { convertAdvancedSearchToReactQueryKeys } from '+/lib/formatters';
import { TSelectOption } from '+/types';
import { IAPIPaginatedResponse, IBodyRequest } from '+/types/axios';
import { IUnidadeCentro } from '+/types/models/empresarial';

interface IUseUnidadeCentros {
  advancedSearch?: IBodyRequest<keyof IUnidadeCentro>['advancedSearch'];
  API_Instance: AxiosInstance;
  centroId?: number;
  empresaAnoFiscalId: number;
  pageNumber?: IBodyRequest['pageNumber'];
  pageSize?: IBodyRequest['pageSize'];
  unidadeId: number;
}

export const useUnidadeCentros = ({
  advancedSearch,
  API_Instance,
  centroId,
  empresaAnoFiscalId,
  pageNumber = 1,
  pageSize = 25,
  unidadeId,
}: IUseUnidadeCentros) => {
  return useQuery(
    [
      'unidade-centros',
      `unidade-id-${unidadeId}`,
      `centro-id-${centroId}`,
      `empresa-ano-fiscal-${empresaAnoFiscalId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      `pageNumber-${pageNumber}`,
      `pageSize-${pageSize}`,
    ],
    async () => {
      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IUnidadeCentro[]>
      >('empresarial/unidades-centros/listar', {
        advancedSearch,
        centroId,
        empresaAnoFiscalId,
        pageNumber,
        pageSize,
        unidadeId,
      } as IBodyRequest<keyof IUnidadeCentro>);

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.centro.codigo} - ${x.centro.nome}`,
        value: x.centro.id,
      }));

      return { ...data, options };
    }
  );
};
