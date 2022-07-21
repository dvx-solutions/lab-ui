import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

import { convertAdvancedSearchToReactQueryKeys } from '+/lib/formatters';
import { TSelectOption } from '+/types';
import { IAPIPaginatedResponse, IBodyRequest } from '+/types/axios';
import { ICentro } from '+/types/models/empresarial';

interface IUseCentros {
  advancedSearch?: IBodyRequest<keyof ICentro>['advancedSearch'];
  API_Instance: AxiosInstance;
  pageNumber?: IBodyRequest['pageNumber'];
  pageSize?: IBodyRequest['pageSize'];
  planoId: number;
}

export const useCentros = ({
  advancedSearch,
  API_Instance,
  pageNumber = 1,
  pageSize = 9999,
  planoId,
}: IUseCentros) => {
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
      >('empresarial/centros/listar', {
        pageNumber,
        pageSize,
        advancedSearch: [
          advancedSearch ? { ...advancedSearch } : {},
          { fields: ['planoId'], keyword: planoId.toString() },
        ],
      } as IBodyRequest<keyof ICentro>);

      const options: TSelectOption[] = data.data.map(x => ({
        text: `${x.codigo} - ${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
};
