import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib/formatters';
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

interface IUseUnidadeCentrosListarUnidades_Centros {
  advancedSearch?: IBodyRequest<keyof IUnidadeCentro>['advancedSearch'];
  API_Instance: AxiosInstance;
  empresaAnoFiscalId: number;
  pageNumber?: IBodyRequest['pageNumber'];
  pageSize?: IBodyRequest['pageSize'];
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

export const useUnidadeCentrosListarUnidades = ({
  advancedSearch,
  API_Instance,
  empresaAnoFiscalId,
  pageNumber = 1,
  pageSize = 25,
}: IUseUnidadeCentrosListarUnidades_Centros) => {
  return useQuery(
    [
      'unidade-centros-listar-unidades',
      `empresaAnoFiscalId-${empresaAnoFiscalId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IUnidadeCentro[]>
      >('empresarial/unidades-centros/listar-unidades', {
        advancedSearch,
        empresaAnoFiscalId,
        pageNumber,
        pageSize,
      } as IBodyRequest<keyof IUnidadeCentro>);

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.unidade.codigo} - ${x.unidade.nome}`,
        value: x.unidade.id,
      }));

      return { ...data, options };
    }
  );
};

export const useUnidadeCentrosListarCentros = ({
  advancedSearch,
  API_Instance,
  empresaAnoFiscalId,
  pageNumber = 1,
  pageSize = 25,
}: IUseUnidadeCentrosListarUnidades_Centros) => {
  return useQuery(
    [
      'unidade-centros-listar-centros',
      `empresaAnoFiscalId-${empresaAnoFiscalId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IUnidadeCentro[]>
      >('empresarial/unidades-centros/listar-centros', {
        advancedSearch,
        empresaAnoFiscalId,
        pageNumber,
        pageSize,
      } as IBodyRequest<keyof IUnidadeCentro>);

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.centro.codigo} - ${x.centro.nome}`,
        value: x.centro.id,
      }));

      return { ...data, options };
    }
  );
};
