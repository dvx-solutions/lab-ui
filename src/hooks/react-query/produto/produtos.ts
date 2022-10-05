import { useQuery } from 'react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  IProduto,
  IQueryParams,
  IQueryByIdParams,
  TSelectOption,
  IAPIResponse,
} from '+/types';

interface IUseProdutos extends IQueryParams<keyof IProduto> {
  planoId: number;
}

export const useProdutos = ({
  advancedSearch,
  API_Instance,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 100000,
  planoId,
}: IUseProdutos) => {
  return useQuery(
    [
      'produtos',
      `planoId-${planoId}`,
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
        IAPIPaginatedResponse<IProduto[]>
      >('produtos/produtos/listar', payload);

      data.data = data.data.filter(x => x.planoId === planoId);

      const options: TSelectOption[] = data.data.map(
        ({ codigo, id, nome }) => ({
          text: `${codigo} - ${nome}`,
          value: id,
        })
      );

      return { ...data, options };
    },
    { enabled: planoId > 0 }
  );
};

export const useProdutoPorId = ({ axiosInstance, id }: IQueryByIdParams) =>
  useQuery(
    ['produtos', `id-${id}`],
    () =>
      axiosInstance
        .get<IAPIResponse<IProduto>>(`produtos/produtos/${id}`)
        .then(({ data }) => data.data),
    { enabled: id > 0 }
  );
