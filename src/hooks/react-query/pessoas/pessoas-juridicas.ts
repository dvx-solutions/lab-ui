import { useQuery } from '@tanstack/react-query';

import {
  convertAdvancedSearchToReactQueryKeys,
  getReactQueryPaginationKeys,
} from '+/lib';
import {
  IAPIPaginatedResponse,
  IPessoaJuridica,
  IQueryParams,
  TSelectOption,
} from '+/types';

export const usePessoasJuridicas = ({
  advancedSearch,
  API_Instance,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 25,
}: IQueryParams<keyof IPessoaJuridica>) => {
  return useQuery(
    [
      'pessoas-juridicas',
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
        IAPIPaginatedResponse<IPessoaJuridica[]>
      >('pessoas/pessoas-juridicas/listar', payload);

      const options: TSelectOption[] = data.data.map(
        ({ codigo, id, razaoSocial }) => ({
          text: `${codigo} - ${razaoSocial}`,
          value: id,
        })
      );

      return { ...data, options };
    }
  );
};
