import { useQuery } from '@tanstack/react-query';

import { convertAdvancedSearchToReactQueryKeys } from '+/lib/formatters';
import { IQueryParams, TSelectOption } from '+/types';
import { IAPIPaginatedResponse } from '+/types/axios';
import { ICentro } from '+/types/models/empresarial';

interface IUseCentros extends IQueryParams<keyof ICentro> {
  planoId: number;
}

export const useCentros = ({
  advancedSearch,
  API_Instance,
  keyword,
  orderBy,
  pageNumber = 1,
  pageSize = 9999,
  planoId,
}: IUseCentros) => {
  const payload = {
    advancedSearch: [
      advancedSearch ? { ...advancedSearch } : {},
      { fields: ['planoId'], keyword: planoId.toString() },
    ],
    keyword,
    orderBy,
    pageNumber,
    pageSize,
  };

  return useQuery(
    [
      'centros',
      `plano-id-${planoId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      `pageNumber-${pageNumber}`,
      `pageSize-${pageSize}`,
    ],
    async () => {
      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<ICentro[]>
      >('empresarial/centros/listar', payload);

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.codigo} - ${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
};
