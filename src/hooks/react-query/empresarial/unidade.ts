import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

import { convertAdvancedSearchToReactQueryKeys } from '+/lib/formatters';
import { TSelectOption } from '+/types';
import { IAPIPaginatedResponse, IBodyRequest } from '+/types/axios';
import { IUnidade } from '+/types/models/empresarial';

interface IUseUnidades {
  advancedSearch?: IBodyRequest<keyof IUnidade>['advancedSearch'];
  API_Instance: AxiosInstance;
  pageNumber?: IBodyRequest['pageNumber'];
  pageSize?: IBodyRequest['pageSize'];
  planoId: number;
}

export const useUnidades = ({
  advancedSearch,
  API_Instance,
  pageNumber = 1,
  pageSize = 9999,
  planoId,
}: IUseUnidades) => {
  return useQuery(
    [
      'unidades',
      `plano-id-${planoId}`,
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      `pageNumber-${pageNumber}`,
      `pageSize-${pageSize}`,
    ],
    async () => {
      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<IUnidade[]>
      >('empresarial/unidades/listar', {
        pageNumber,
        pageSize,
        advancedSearch: [
          advancedSearch ? { ...advancedSearch } : {},
          { fields: ['planoId'], keyword: planoId.toString() },
        ],
      } as IBodyRequest<keyof IUnidade>);

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.codigo} - ${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
};
