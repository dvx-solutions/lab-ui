import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

import { convertAdvancedSearchToReactQueryKeys } from '+/lib';
import { INaturezaOrcamento, TSelectOption } from '+/types';
import { IAPIPaginatedResponse, IBodyRequest } from '+/types/axios';

interface IUseNaturezaOrcamento {
  advancedSearch?: IBodyRequest<keyof INaturezaOrcamento>['advancedSearch'];
  API_Instance: AxiosInstance;
  pageNumber?: IBodyRequest['pageNumber'];
  pageSize?: IBodyRequest['pageSize'];
}

export const useNaturezaOrcamento = ({
  API_Instance,
  advancedSearch,
  pageNumber = 1,
  pageSize = 25,
}: IUseNaturezaOrcamento) => {
  return useQuery(
    [
      'naturezas-orcamentos',
      convertAdvancedSearchToReactQueryKeys(advancedSearch),
      `page-${pageNumber}-size-${pageSize}`,
    ],
    async () => {
      const { data } = await API_Instance.post<
        IAPIPaginatedResponse<INaturezaOrcamento[]>
      >('orcamentos/naturezas-orcamentos/listar', {
        advancedSearch,
        pageNumber,
        pageSize,
      } as IBodyRequest);

      const options: TSelectOption[] = data.data?.map(x => ({
        text: `${x.codigo} - ${x.nome}`,
        value: x.id,
      }));

      return { ...data, options };
    }
  );
};
