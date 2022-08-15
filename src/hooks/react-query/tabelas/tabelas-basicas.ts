import { useQuery } from '@tanstack/react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  IAPIResponse,
  ITabelaBasica,
  IQueryParams,
  TSelectOption,
} from '+/types';

interface IUseTabelasBasicasProps extends IQueryParams<keyof ITabelaBasica> {
  rota: string; // nome da rota da API. Ex.: formas-pagamentos
}

interface IUseTabelasBasicasPorId extends IQueryParams<keyof ITabelaBasica> {
  id: number;
  rota: string; // nome da rota da API. Ex.: formas-pagamentos
}

export const useTabelasBasicas = ({
  advancedSearch,
  API_Instance,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
  rota,
}: IUseTabelasBasicasProps) => {
  return useQuery(
    [
      rota,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      getReactQueryPaginationKeys(pageNumber, pageSize),
    ],
    async () => {
      const payload = {
        advancedSearch,
        keyword,
        orderBy,
        pageNumber,
        pageSize,
      };

      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<ITabelaBasica[]>
      >(`tabelas/${rota}/listar`, payload);

      const options: TSelectOption[] = data.data.map(
        ({ codigo, nome, id }) => ({
          text: `${codigo} - ${nome}`,
          value: id,
        })
      );

      return { ...data, options };
    }
  );
};

export const IuseTabelasBasicasPorId = ({
  API_Instance,
  id,
  rota,
}: IUseTabelasBasicasPorId) => {
  return useQuery([rota, `id-${id}`], async () => {
    const { data } = await API_Instance.get<IAPIResponse<ITabelaBasica>>(
      `tabelas/${rota}/${id}`
    );

    return data;
  });
};
